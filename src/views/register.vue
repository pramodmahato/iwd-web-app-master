<template>
    <v-slide-y-reverse-transition>
    <v-container fluid class="mt-5"  >
        <v-layout wrap align-center justify-center row fill-height class="pa-3" >
            
            <v-flex xs12 md2 lg2 class="pa-3 hidden-sm-and-down" v-on="callOnLoad()">
                <v-img
                    width="100%"
                    :src="require('@/assets/img/svg/getting-started_bg.svg')"
                    :lazy-src="require('@/assets/img/svg/getting-started_bg.svg')">
                    
                        <v-layout
                            slot="placeholder"
                            fill-height
                            align-center
                            justify-center
                            ma-0
                        >
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-layout>    
                </v-img>
            </v-flex>
            <v-flex xs12 md6 lg4 v-if=" status ==false" layout-align="center center"
>
                <v-btn color="#f1f8e9" @click="auth"  style="margin-left:60px;">
                  <v-img
                    width="20px"
                    :src="require('@/assets/img/googlelogo.png')"
                    :lazy-src="require('@/assets/img/googlelogo.png')"></v-img>
                   &nbsp;&nbsp;Sign In</v-btn>
            </v-flex>
            <v-flex xs12 md6 lg4  v-if="status==true">
                <span class="pa-2 google-font" style="border-radius:8px;background-color:#FFEBEE;color:#B71C1C;font-size:150%" >Register</span><br>
               
                <p class="mt-0 google-font subheading"><br>Venue: To be announced soon<br>Date: 31st March, 2019</p>
                <v-divider></v-divider>
               <v-form
    ref="form"
    lazy-validation
  >
            <v-text-field
            v-model="form.name"
            maxlength=40
            :rules="[v => !!v || 'Item is required']"
            label="Full Name"
            required
            ></v-text-field>

            

            <v-radio-group v-model="radioGroup" :rules="[v => !!v || 'Item is required']" required>
      <v-radio
        
        :label="`Male`"
        :value="1"
        
      ></v-radio>
      <v-radio
        
        :label="`Female`"
        :value="2"
      ></v-radio>
      
    </v-radio-group>

            <v-select
            v-model="form.profession"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Profession"
            required
            ></v-select>

             <v-text-field
            v-model="form.city"
            maxlength=25
            :rules="[v => !!v || 'Item is required']"
            required
            label="Current City"
            ></v-text-field>

             <v-text-field
            v-model="form.experience"
            :rules="[v => !!v || 'Item is required']"
            required
            type="number"
            label="Years of Experience"
            ></v-text-field>

             <v-text-field
            v-model="form.whyattend"
          required
          :rules="[v => !!v || 'Item is required']"
            maxlength=150
            label="Why do you want to attend?"
            ></v-text-field>

<p class="mt-0 google-font subheading"><br>Profile Links</p>

            <v-text-field
            v-model="form.github"
            maxlength=50
          required
          :rules="[v => !!v || 'Item is required']"
            label="Github"
            ></v-text-field>
             <v-text-field
            v-model="form.twitter"
            :rules="[v => !!v || 'Item is required']"
            required
            maxlength=50
            label="Twitter"
            ></v-text-field>
             <v-text-field
            v-model="form.stackoverflow"
            :rules="[v => !!v || 'Item is required']"
           required
            maxlength=50
            label="Stackoverflow"
            ></v-text-field>
             <v-text-field
            v-model="form.linkedin"
            :rules="[v => !!v || 'Item is required']"
            maxlength=50
            required
            label="Linkedin"
            ></v-text-field>

            
           
            
            <v-btn
            
            color="success"
            @click="checkForm"
            >
            Register
            </v-btn>
             <br>
            
            <v-btn
            color="red"
            @click="signOut"
            style="color:white;"
            >Sign Out
            
            </v-btn>

           
  </v-form>
            </v-flex>

            

          
           
        </v-layout>
    </v-container>
    </v-slide-y-reverse-transition>
</template>

<script>

import Firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyC87ELuilMtcoNLMveEuKkPCYDrTomVRT0",
    authDomain: "iwd-19-jalandhar.firebaseapp.com",
    databaseURL: "https://iwd-19-jalandhar.firebaseio.com",
    projectId: "iwd-19-jalandhar",
    storageBucket: "iwd-19-jalandhar.appspot.com",
    messagingSenderId: "458894231511"
  };
  let app=Firebase.initializeApp(config);
   let db = app.database()
let participantsRef = db.ref('participants')
var provider = new Firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
Firebase.auth().languageCode = 'en';

export default {
    
    components:{
    },
    computed:{
      status()
      {
        return this.$store.state.loggedin;
      }
      
    },
    data() {
         
        return {
            form:{
                 linkedin:"",
            github:"",
            twitter:"",
            stackoverflow:"",
            profession:"",
            
            gender:"",
            name:"",
            email: "",
            },
            radioGroup:0,
            
           
            items: [
                'Student',
                'Professional',
                'Entrepreneur',
                'Others'
              ]
        }
        
    },
    mounted(){
        this.show = true
    },
    methods:{ signOut()
    {
      Firebase.auth().signOut().then(function() {
  localStorage.removeItem('wtmUser');
  window.location.reload(true);
}).catch(function(error) {
  console.log(error);
});
    },
    callOnLoad()
    {
      
      if(localStorage.getItem("wtmUser") === null)
      {
        this.changeStatusToFalse();
      }
      else
      {
        this.changeStatusToTrue();
        this.form.email=localStorage.getItem("wtmUser");
        
      }
    },
      changeStatusToTrue(){
      this.$store.commit('changeStatusToTrue');
    },
    changeStatusToFalse(){
      this.$store.commit('changeStatusToFalse');
    },
      
        getImgUrl(pic) {
            if(pic.length>0){

                return require('@/assets/img/teams/'+pic)
            }else{
                return require('@/assets/img/avatar.png')
            }
        },
         async auth()
        { var done=false;
        var currentUser;
            await Firebase.auth().signInWithPopup(provider).then(function(result) {
 
   
  currentUser = result.user.email;
  localStorage.setItem('wtmUser', currentUser);
  console.log("Logged in as: "+currentUser);  
  done=true;

}).catch(function(error) {
 
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(error);
  alert("Couldn't login to your Google Account:\nError Code: "+errorCode+"\nError Message: "+errorMessage);
});

  if(done==true)
{
  await participantsRef.orderByChild("email").equalTo(currentUser).once("value",snapshot => {
    if (snapshot.exists()){
      alert("You have already registered!");
      localStorage.setItem('registered',true)
    }
    else{
      this.$store.commit('changeStatusToTrue');
      localStorage.setItem('registered',false)
  this.form.email=currentUser;
    }
});
  
}
        },
        
     checkForm()
        {
            var msg="Please fill the following fields: \n";
            var count=0;
             if(this.radioGroup==1)
             {
                 this.form.gender="Male";
             }
             else if(this.radioGroup==2)
             {
                 this.form.gender="Female";
             }
           for(var a in this.form)
           {
               var data=this.form[a];
               if(!data)
               {
                   msg=msg+ "* "+ a +"\n";
                   count++;
               }
             
           }
             if(count>0)
               {
                   alert(msg);
               }
               else
               {
                   
                   this.onSubmit();
               }

        },
         onSubmit() {
      
      var letters = /^[a-zA-Z ]*$/;
      var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
    
       if( this.form.name.match(letters))
     { 
        
       if(re.test(String(this.form.email).toLowerCase()))
       {
     
         var tw = new RegExp("twitter.com");
         var gt = new RegExp("github.com");
         var lin = new RegExp("linkedin.com");
         var st=new RegExp("stackoverflow.com");
      
        
         if(st.test(this.form.stackoverflow)
            && tw.test(this.form.twitter)
            && gt.test(this.form.github)
            && lin.test(this.form.linkedin)
         )
         {
            
             participantsRef.push(this.form);
            alert("Registered Succesfully!");

           return true;
         }
         else
         {
           alert("Profile Link Should be in this format: \nhttps://www.example.com/username");
         }
         
       }
      else{
        alert("Enter a valid email");
      }
     }
   else
     {
     alert("Non Aplphabets Found ");
     return false;
     }
      
     
     
      
      
    }
    }
}
</script>
