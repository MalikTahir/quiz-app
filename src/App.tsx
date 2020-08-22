import React,{useEffect, useState} from 'react';
import dbTests from './Components/FBConfig'
import './App.css';
import Tests from './Component/Tests/Tests'
import { useStateValue } from './Component/Store/StateProvider';
import Questions from './Component/Questions/Questions';
function App() {
  const [{StartTest,TestID}] = useStateValue()
  const [testID,setID] = useState();
  useEffect(()=>{
  async function fo(){
    const snapshot = await dbTests.collection('Tests').doc('2008 Deputy Director').collection('Quiz').get();
    
    snapshot.forEach((doc)=>{
    
      // console.log(doc.id,'=>',doc.data())
    })
  }
  fo();
  },[])
  return (
    <div className="app">
      {
        ((StartTest=="f"))?(
          <Tests category="ALL"></Tests>

        ):(
          <Questions ID={TestID}></Questions>
        )
      }
      
    </div>
  );
}

export default App;
