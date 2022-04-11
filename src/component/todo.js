import React, {useState, useEffect} from 'react'
import "../App.css"

 // to get the data from LS

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('plzz fill data');
        } else if(inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
                 setToggleSubmit(true);

                 setInputData('');

                 setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData }
            setItems([...items, allInputData]);
            setInputData('')
        }
    }

 // add data to localStorage
 useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items))
 }, [items]);

    // const editItem = (id) => {
    //     let newEditItem = items.find((elem) => {
    //         return elem.id === id
    //     });
    //     console.log(newEditItem);

    // }
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);

    }
    const removeAll = () => {
        setItems([]);
   }


    // delete the items
 const deleteItem = (index) => {
    
   const updateditems = items.filter((elem) => {
       return index !== elem.id;
   });

   setItems (updateditems);
}
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        
                    <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                       <div className="addItems">
                        <input type="text" placeholder="✍ Add Items..."
                           value={inputData} 
                           onChange={(e) => setInputData(e.target.value) }
                        />
                        {/* {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                                <button className="ed" onClick={addItem}><span> edit </span> </button>
                        } */}
                        <button className="ad" onClick={addItem}><span> add </span> </button> 
           
                    </div>


                    <div className="showItems"> 
                        
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                            <div className="ed">    

                    <button className="ed" onClick={() => deleteItem(elem.id)}><span> Delete </span> </button>
                    <button className="ed" onClick={() => editItem(elem.id)}><span> edit </span> </button>
                    </div>
                    </div>
                    
                                       
                                  
                                )
                            })

                        }
                       
                    </div>
                    {/* clear all button  */}
                    <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> CHECK LIST </span> </button>
                    </div>
                                  </div>

                    

                 </div>
           
        </>
    )
}
export default Todo