import { act } from "@testing-library/react";

export const initialValue={
    basket:[
        {
            statement:"",
            a1:"Option 1",
            a2:"Option 2",
            a3:"Option 3",
            a4:"Option 4",
            r:"Right option",
            c:"Choice"
        }
    ],
    StartTest:"f",
    TestID:"ID of selected Test",
    TestDetail:{
        tOrg:"tOrg",
        tPost:"tPost"
    },
    
}
function reducer(state,action) {
    switch(action.type){
        case 'ADD':
            return [...state]
        case 'AddTestDetail':
            return{
                ...state,
                TestDetail:action.item
            }; 
        case 'StartTest':
            return {
                ...state,
                StartTest:action.item
            };
            case 'StartTest1':
                return{
                    ...state,
                    StartTest:action.item.StartTest,
                    TestID:action.item.TestID,
                    TestDetail:action.item.TestDetail
                }
        case 'SetID':
            return {
                ...state,
                TestID:action.item
            }           
        default:
            return [...state]    
    }
}

export default reducer
