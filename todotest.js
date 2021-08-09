import React, { useEffect, useState } from 'react'
import'../App.css'
const Todotest =()=>{
    // to get the data from local storage
   const getLocalItems=()=>{
    let list=localStorage.getItem('lists');
    if(list){
        return JSON.parse( localStorage.getItem('lists'));
    }else{
        return[];
    }
}
    const[inputData,setInputData]=useState('');
    const[items,setItems]=useState(getLocalItems());
    const [toggleSubmit,setToggleSubmit]=useState(true);
    const[isEditItem,setIsEditItem]=useState(null)
    const addItem =()=>
    {
        if(!inputData)
        
        {
         alert('plz fill data');
        }
        else if(inputData && !toggleSubmit)
        {
            setItems(
                items.map((elem)=>
                {
                    if(elem.id===isEditItem)
                    {
                        return {...elem,name:inputData}
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        }

        else
        {
            const allInputData =  { id:new Date().getTime().toString(),name:inputData}
            
            
            setItems([...items,allInputData]);
            setInputData('')
        }
        
    }


    const deleteItem=(index)=>{
     const updateditems= items.filter((elem)=>{
         return index != elem.id;
         
     });
     setItems([updateditems]);
    }
    const removeAll=()=>{
        setItems([]);
    }
    //add data to localStorage
    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(items))
            
        
    },[items]);
   const editItem=(id)=>{
       let newEditItem=items.find((elem)=>{
           return elem.id==id
       });
       setToggleSubmit(false);
       setInputData(newEditItem.name);
       setIsEditItem(id);

   }
    return(
        <>
      <div className="main-div">
          <div className="child-div">
       <figcaption><h1>Add your List here </h1> </figcaption>
          
          <div className="addItems">
              <input type="text"placeholder="Add items.."
              value={inputData}
              onChange={(e)=>setInputData(e.target.value)}/>
              {
             
           toggleSubmit ?   <i className="fa fa-plus add-btn"title="Add item"onClick={addItem}></i> :
              
                 
           <i className="far fa-edit add-btn"title="Update item" onClick={addItem}></i>
              }
          </div>
          <div className="showItems">
          {
              items.map((elem,ind)=>{
                  return(
                    <div className="eachItem"key={elem.id}>
                  <h3>{elem.name}</h3>
                  <div className="todo-btn">
                 
                  <i className="far fa-edit add-btn" title="Edit item" onClick={()=>editItem(elem.id)}></i>
                  <i className="far fa-trash-alt add-btn"title="Delete item" onClick={()=>deleteItem(elem.id)}></i>
              </div>
              </div>
                  )
              })
          }
              
          </div>
          <div className="showItems">
              <button className="btn effect04"data-sm-link-text="Remove All"onClick={removeAll}><span>Check List</span></button>
          </div>
          </div> 
      </div>
        </>
    )
}
export default Todotest;