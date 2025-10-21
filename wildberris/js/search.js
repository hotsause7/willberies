const search = () => {
    const searchInput = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');

    // searchInput.addEventListener('input', (e) => {
    //    const searchValue = e.target.value.trim();
    //   if (searchValue.length > 1) {
    //     renderGoods(searchValue)
    //   } else if (searchValue.length === 0) {
        
    //   }
          
    // })
    
    // Функция для создания товаров (импортируем логику из getDataBase.js)
    const createGoods = (filteredArray) => {
        const goodsWrapper = document.querySelector('.long-goods-list');
        if (!goodsWrapper) return;
        
        goodsWrapper.innerHTML = '';
        filteredArray.forEach((good) => {
            const goodItem = document.createElement('div')
            goodItem.classList.add('col-lg-3')
            goodItem.classList.add('col-sm-6')

            goodItem.innerHTML = `
                <div class="goods-card">
					    <img src="db/${good.img}" alt="image: Text T-Shirt" class="goods-image">
						<h3 class="goods-title">${good.name}</h3>
						<p class="goods-description">${good.description}</p>
						<button class="button goods-card-btn add-to-cart" data-id=${good.id}>
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

    // Функция поиска по названиям товаров
    const searchGoods = (searchTerm) => {
        fetch('https://willberies-3538b-default-rtdb.firebaseio.com/db.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // Извлекаем массив товаров из объекта db
            const goodsArray = data.db || data;
            
            const filteredArray = goodsArray.filter((item) => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            localStorage.setItem('dataBase', JSON.stringify(filteredArray));
            createGoods(filteredArray);
        })
        .catch((error) => {
            console.error('Ошибка при поиске:', error);
        });
    }

    // Живой поиск при вводе текста
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();
        if (searchTerm.length >= 2) {
            searchGoods(searchTerm);
        } else if (searchTerm.length === 0) {
            // Если поле пустое, показываем все товары
            fetch('https://willberies-3538b-default-rtdb.firebaseio.com/db.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Извлекаем массив товаров из объекта db
                const goodsArray = data.db || data;
                localStorage.setItem('dataBase', JSON.stringify(goodsArray));
                createGoods(goodsArray);
            })
            .catch((error) => {
                console.error('Ошибка при загрузке всех товаров:', error);
            });
        }
    });

    // Поиск по кнопке
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length >= 2) {
            searchGoods(searchTerm);
        }
    });
}

search();
