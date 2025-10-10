const getData = () => {
    const links = document.querySelectorAll('.navigation-item')
  
    const getResponse = () => {
        fetch('https://willberies-3538b-default-rtdb.firebaseio.com/db.json')
            .then((response) => response.json())
            .then ((data) => {
                console.log(data);
                
                localStorage.setItem('dataBase', JSON.stringify(data))          
    })
}

    links.forEach((link) => {
            link.addEventListener('click', () => {
                getResponse()
            })
        })      
}

getData();
