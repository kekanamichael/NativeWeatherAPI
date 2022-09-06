import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import { ImageBackground, TextInput } from 'react-native-web';
import img from './assets/pexels-vladyslav-dushenkovsky-4100130.jpg'

export default function App() {


  const [data, setData] = useState({})
  const [location, setLocation] = useState('Pretoria')

  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ea21ac3919f88c71266d2d4a95c48e48`;

  axios.get(url).then((response)=>{
    setData(response.data)
  })

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
       axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
       })
       setLocation('')
    }
  }
  const dateBuilder = (d)=>{
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear()
    return `${day}, ${date} ${month} ${year}`
  }
  return (

    <View style={styles.container}>
    <ImageBackground style={styles.bckImage} source={img} resizeMode = 'cover'>

      <View style={styles.wrapper}>

        <View style={styles.mainwrapper}>
        <TextInput style={styles.input} onChange={event =>setLocation(event.target.value)}
          onKeyPress={searchLocation} 
          value={location}
          placeholder='Enter location'
          type='text'
        /> 
        <View style={styles.city}>
          <Text>{data.name} {/* {data.sys.country} */}</Text>
          <Text style={styles.dates}>{dateBuilder(new Date())}</Text>
          <View style={styles.line}></View>
        </View>
          <View style={styles.sec}>
              <View style={styles.temp}>
                  {data.main ? <Text style={{fontSize:"55px"}} >{data.main.temp.toFixed()}{/* <sup>o</sup>C */}</Text> : null}
              </View>
              <View style={styles.secView}>
                 <View style={styles.weather}>
                    {data.weather ? <Text>{data.weather[0].description}</Text> : null}
                 </View>
                 <View style={styles.feels}>
                    {data.main ? <Text><Text style={styles.span}>Feels Like:</Text> {data.main.feels_like.toFixed()}{/* <sup>o</sup>C */}</Text> : null}
                 </View>
                 <View style={styles.humidity}>
                    {data.main ? <Text><Text style={styles.span}>Humidity: </Text>{data.main.humidity.toFixed()}%</Text> : null}
                </View>
                <View style={styles.wind}>
                   {data.wind ? <Text><Text style={styles.span}>Wind speed:  </Text> {data.wind.speed} MPH</Text> : null}
                </View>
             </View>
          </View>
        </View>
        
      </View>
    </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundImage: "url('./files/pexels-vladyslav-dushenkovsky-4100130.jpg')",
    backgroundColor: '#ddd',
    flex:1,
    textAlign: 'center',
    justifyContent: 'center', 
  },
  mainwrapper: {
    textAlign: "center",
    width: "100%",
    flexWrap: "wrap", 
  },
  bckImage:{
    flex: 1
  }, 
  wrapper:{
    marginTop: 100,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
    width: "60%",
    fontSize: 24,
    borderBottom: "1px solid orangered",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: 'center',
    marginLeft: 300
  },
  input:{
    padding: 10,
    marginTop: 20,
    width: "27%",
    fontSize: 20,
    backgroundColor:"#fff",
    marginLeft: 300,
  },
  city:{
    color: "#fff",
    textAlign: "start",
    marginLeft: 100,
  },
  line:{
    border: "1px solid orangered",
    width: "40%",
    justifyContent: "end",
  },
  sec:{
    color: "#fff",
    flexDirection: "row",
    marginLeft: 50,
    flexWrap: "wrap",
  },
  secdiv:{
    color: "#fff",
    textAlign: "start",
    marginLeft: 50,
    flexWrap: "wrap"
  
  },
  span:{
    color: "#fff",
    marginRight: 10,
    fontSize: 24,
    fontWeight: 100
  },
   temp:{
    color: "#fff",
    marginBottom: 100
  }, 
  dates:{
    color: "#fff",
    fontSize: 14
  },  
  

 /*  body:{
    backgroundImage: "url('./files/pexels-vladyslav-dushenkovsky-4100130.jpg')",
    backgroundAttachment: "fixed",
    backgroundSize: "100%",
  } */
});
