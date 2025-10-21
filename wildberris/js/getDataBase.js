// Задачи:
// 1. Загрузить данные с сервера.+++
//  1.1 Перевести в JSON и отправить в localStorage.
// 2. По нажатию на кнопку навигации получить название категории текст
// 3. Имея эти данный отфильтровать массив в базе данных.
//     3.1 Вернуть отфильтрованный массив и вернуть его из localStorage

const getDataBase = () => {
    const links = document.querySelectorAll('.navigation-link')

    const createGoods = (filteredArray) => {
        const goodsWrapper = document.querySelector('.long-goods-list')
        if (!goodsWrapper) {
            console.error('Element .long-goods-list not found');
            return;
        }
        
        goodsWrapper.innerHTML = '';
        filteredArray.forEach((good) => {
            const goodItem = document.createElement('div')
            goodItem.classList.add('col-lg-3')
            goodItem.classList.add('col-sm-6')

            goodItem.innerHTML = `
                <div class="goods-card">
					    <img src="db/${good.img}" alt="image: ${good.name}" class="goods-image">
						<h3 class="goods-title">${good.name}</h3>
						<p class="goods-description">${good.description}</p>
						<button class="button goods-card-btn add-to-cart" data-id="${good.id}">
							<span class="button-price">$${good.price}</span>
						</button>
					</div>
            `
            
            if (good.label) {
                const goodsCard = goodItem.querySelector('.goods-card');
                const labelSpan = document.createElement('span');
                labelSpan.classList.add('label');
                labelSpan.textContent = good.label;
                goodsCard.insertBefore(labelSpan, goodsCard.firstChild);
            }
            goodsWrapper.appendChild(goodItem)
        })   
    }

    
    const getResponse = (text, category) => {
        
        fetch('https://willberies-3538b-default-rtdb.firebaseio.com/db.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            
            const goodsArray = data.db || data;
            
            const filteredArray = category ? goodsArray.filter((item) => item[category] === text) : goodsArray;
            console.log('Filtered array:', filteredArray);
            
            localStorage.setItem('dataBase', JSON.stringify(filteredArray))   
            createGoods(filteredArray) 
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const linkText = link.textContent.trim();
            const linkGender = link.dataset.field;
            
            getResponse(linkText, linkGender)
            
            if(!window.location.pathname.includes('goods.html')) {
                window.location.href = 'goods.html';
            }
            
        })
    })

}

// Функция для загрузки всех товаров при загрузке страницы
const loadAllGoods = () => {
    
    fetch('https://willberies-3538b-default-rtdb.firebaseio.com/db.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        const goodsArray = data.db || data;
        
        localStorage.setItem('dataBase', JSON.stringify(goodsArray));
        
        if (window.location.pathname.includes('goods.html')) {
            const createGoods = (filteredArray) => {
                const goodsWrapper = document.querySelector('.long-goods-list')
                if (!goodsWrapper) {
                    console.error('Element .long-goods-list not found');
                    return;
                }
                
                goodsWrapper.innerHTML = '';
                filteredArray.forEach((good) => {
                    const goodItem = document.createElement('div')
                    goodItem.classList.add('col-lg-3')
                    goodItem.classList.add('col-sm-6')

                    goodItem.innerHTML = `
                        <div class="goods-card">
                            <img src="db/${good.img}" alt="image: ${good.name}" class="goods-image">
                            <h3 class="goods-title">${good.name}</h3>
                            <p class="goods-description">${good.description}</p>
                            <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
                                <span class="button-price">$${good.price}</span>
                            </button>
                        </div>
                    `
                    
                    if (good.label) {
                        const goodsCard = goodItem.querySelector('.goods-card');
                        const labelSpan = document.createElement('span');
                        labelSpan.classList.add('label');
                        labelSpan.textContent = good.label;
                        goodsCard.insertBefore(labelSpan, goodsCard.firstChild);
                    }
                    goodsWrapper.appendChild(goodItem)
                })   
            }
            
            createGoods(goodsArray);
        }
    })
    .catch((error) => {
        console.error('Error loading all goods:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadAllGoods();
});

getDataBase()