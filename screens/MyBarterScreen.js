import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyTradeScreen extends Component {
   constructor(){
     super()
     this.state = {
       donorId : firebase.auth().currentUser.email,
       donorName : "",
       allTrades : []
     }
     this.requestRef= null
   }

   static navigationOptions = { header: null };

   getDonorDetails=(donorId)=>{
     db.collection("users").where("email_id","==", donorId).get()
     .then((snapshot)=>{
       snapshot.forEach((doc) => {
         this.setState({
           "donorName" : doc.data().first_name + " " + doc.data().last_name
         })
       });
     })
   }

   getAllTrades =()=>{
     this.requestRef = db.collection("all_trades").where("donor_id" ,'==', this.state.donorId)
     .onSnapshot((snapshot)=>{
       var allTrades = []
       snapshot.docs.map((doc) =>{
         var donation = doc.data()
         donation["doc_id"] = doc.id
         allTrades.push(donation)
       });
       this.setState({
         allTrades : allTrades
       });
     })
   }

   tradeItem=(itemDetails)=>{
     if(itemDetails.request_status === "Item Traded"){
       var requestStatus = "Donor Interested"
       db.collection("all_trades").doc(itemDetails.doc_id).update({
         "request_status" : "Donor Interested"
       })
       this.sendNotification(itemDetails,requestStatus)
     }
     else{
       var requestStatus = "Item Traded"
       db.collection("all_trades").doc(itemDetails.doc_id).update({
         "request_status" : "Item Traded"
       })
       this.sendNotification(itemDetails,requestStatus)
     }
   }

   sendNotification=(itemDetails,requestStatus)=>{
     var requestId = itemDetails.request_id
     var donorId = itemDetails.donor_id
     db.collection("all_notifications")
     .where("request_id","==", requestId)
     .where("donor_id","==",donorId)
     .get()
     .then((snapshot)=>{
       snapshot.forEach((doc) => {
         var message = ""
         if(requestStatus === "Item Traded"){
           message = this.state.donorName + " traded the item you requested"
         }else{
            message =  this.state.donorName  + " has shown interest in trading the item"
         }
         db.collection("all_notifications").doc(doc.id).update({
           "message": message,
           "notification_status" : "unread",
           "date"                : firebase.firestore.FieldValue.serverTimestamp()
         })
       });
     })
   }

   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       title={item.item_name}
       subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
       leftElement={<Icon name="item" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
           <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor : item.request_status === "Item Traded" ? "green" : "#ff5722"
              }
            ]}
            onPress = {()=>{
              this.tradeItem(item)
            }}
           >
             <Text style={{color:'#ffff'}}>{
               item.request_status === "Item Traded" ? "Item Traded" : "Trade Item"
             }</Text>
           </TouchableOpacity>
         }
       bottomDivider
     />
   )


   componentDidMount(){
     this.getDonorDetails(this.state.donorId)
     this.getAllTrades()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Trades"/>
         <View style={{flex:1}}>
           {
             this.state.allTrades.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all item trades</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allTrades}
                 renderItem={this.renderItem}
               />
             )
           }
         </View>
       </View>
     )
   }
   }


const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})