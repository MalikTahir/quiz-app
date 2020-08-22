import React,{useEffect,useState} from 'react'
import {Grid, Paper} from '@material-ui/core'
import {useStateValue} from './../Store/StateProvider'
import dbTests from '../../Components/FBConfig';
import './Tests.css'
function Tests({category}:{category:any}) {
    const [{basket,TestDetail,StartTest,TestID},dispatch] = useStateValue();
    let tests:any;
    let setTests:any;
    [tests,setTests] = useState();
    let ID:any;
    let setID:any;
    [ID,setID]=useState(StartTest);
    useEffect(()=>{
// async function for fetching data of tests from firebase
                     async function fetchData(){
                        const testRef = await dbTests.collection('Tests');
                        (category==="ALL")?(
                            await dbTests.collection('Tests').onSnapshot(snp=>{
                                setTests(snp.docs.map(test=>test.data()))
                                                                        })
                                            ):(
                             await dbTests.collection('Tests').where('tOrg','==',category).onSnapshot(snp=>{
                                setTests(snp.docs.map(test=>test.data()))
                                                                        })
                        )
            }
            fetchData()
                },[])

// Function for handling button clicks
    async function testSelected(org:any,post:any){
        
        const selected = await dbTests.collection('Tests').where('tPost','==',post).where('tOrg','==',org).
        onSnapshot(snapshot=>(snapshot.docs.map(t=>{dispatch({
            type:"StartTest1",
            item:{
                TestID:t.id,
                Startest:"t",
                TestDetail:{
                    tPost:post,
                    tOrg:org
                }
            }
        })})))
        
        console.log(TestID)
    }
    return (
        <Grid container spacing={4} xs={12} sm={12} className="tests">
            
            {
                ((tests))?(
                    
                    Object.values(tests).map((test:any)=>{
                        return(
                            <Grid xs={12} sm={3} className="tests__testcard"  onClick={()=>{testSelected(test.tOrg,test.tPost)}}>
                                <Paper >
                                    <p>{test['tPost']}</p>
                                    <p>{test.tOrg}</p>
                                    <img src={test && test['tOI']} alt=""/>
                                </Paper>
                            </Grid>
                        )
                    })
                ):(
                    <p>No test Found</p>
                )
                
            }
            
        </Grid>
    )
}

export default Tests
