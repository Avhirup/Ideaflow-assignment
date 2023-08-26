import { useState } from 'react'
import './MainComponent.scss'
import { useEffect } from 'react';
export default function MainComponent() {

    const [update, setUpdate] = useState(false);
    const [idx, setIdx] = useState(0);

    const [formData, setFormData] = useState({
        textInput: ""
    });

    const [items, setItems] = useState([]);

    useEffect(() => {
        const localStorageData = localStorage.getItem('items');
        if (localStorageData) {
            setItems(JSON.parse(localStorageData));
        }
    }, []);

    function makeInput(indexToUpdate) {
        const elem = items[indexToUpdate];
        setFormData({ textInput: elem });
        setUpdate(preVal => !preVal);
        setIdx(indexToUpdate);
    }

    const renderItems = items.map((item, index) => (<p key={index} onClick={() => makeInput(index)}>{item}</p>));

    const savedOptions = items;
    function handleOptionClick(option) {
        setFormData(preVal => ({
            textInput: preVal.textInput + option
        }))
        document.querySelector('.hiddenList').classList.add('hide');
    }

    function changeInput(e) {
        setFormData(preVal => ({
            ...preVal,
            [e.target.name]: e.target.value,
        }));

        if (e.target.value.charAt(e.target.value.length - 1) === '>' && e.target.value.charAt(e.target.value.length - 2 === '<')) {
            document.querySelector('.hiddenList').classList.remove('hide');
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newItem = formData.textInput;
        if (newItem !== "" && items.includes(newItem)) {
            alert('Item already exists');
            return;
        }
        else {
            if (update) {
                const updatedItems = items.map((elem, index) => {
                    if (index === idx)
                        return newItem;
                    else
                        return elem;
                })
                localStorage.setItem('items', JSON.stringify(updatedItems));
                setItems(updatedItems);
                setUpdate(preVal => !preVal);
                setIdx(0);
            }
            else {
                const updatedItems = items;
                if (newItem === "")
                    updatedItems.unshift(" ");
                else
                    updatedItems.unshift(newItem);

                localStorage.setItem('items', JSON.stringify(updatedItems));
                setItems(updatedItems);
            }
        }
        setFormData({ textInput: "" })
    }


    return (
        <div className='container'>
            <header>
                <p className="heading">
                    Ideaflow - dev same window | Ideaflow
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-content">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input autoComplete="off" type="text" placeholder='Search Notes' name='textInput' value={formData.textInput} onChange={changeInput} />
                    </div>
                    <div className="form-btn">
                        <button><i className="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </form>
            </header>
            <section>
                <div className="sec-heading">
                    <p>Today</p>
                </div>
                <div className="hiddenList hide">
                    <ul className='hideUL'>
                        {savedOptions.map((option, index) => (
                            <li key={index} onClick={() => handleOptionClick(option)}>
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="sec-content">
                    {renderItems}
                </div>
            </section>
        </div>
    )
}

