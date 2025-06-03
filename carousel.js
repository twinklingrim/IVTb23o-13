/**
 * Функция для создания карусели изображений
 * @param {Array} images - Массив строк с путями к изображениям
 * @param {String} selector - CSS селектор контейнера для карусели
 * @param {Number} [interval=3000] - Интервал автоматической смены изображений (мс)
 */
function createCarousel(images, selector, interval = 3000) {
    // Проверяем, начинается ли селектор с точки (для классов)
    // Если нет - добавляем точку в начало
    const fullSelector = selector.startsWith('.') ? selector : `.${selector}`;
    // Находим элемент-контейнер по селектору
    const container = document.querySelector(fullSelector);
    
    if (!container) {
        console.error(`Элемент "${fullSelector}" не найден`);
        return; // Выходим, если контейнер не найден
    }

    // Создаем HTML-разметку карусели:
    // - Основной блок carousel
    // - Внутренний контейнер carousel-inner
    // - Элементы carousel-item для каждого изображения
    // - Кнопки навигации
    container.innerHTML = `
        <div class="carousel">
            <div class="carousel-inner">
                ${images.map((img, index) => `
                    <!-- Каждый элемент карусели, первый активен по умолчанию -->
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${img}" alt="Slide ${index + 1}">
                    </div>
                `).join('')}
            </div>
            <!-- Кнопки переключения -->
            <button class="carousel-button prev">&lt;</button>
            <button class="carousel-button next">&gt;</button>
        </div>
    `;

    // Получаем ссылки на созданные DOM-элементы:
    const carousel = container.querySelector('.carousel'); // Основной контейнер
    const items = container.querySelectorAll('.carousel-item'); // Все слайды
    const prevBtn = container.querySelector('.prev'); // Кнопка "назад"
    const nextBtn = container.querySelector('.next'); // Кнопка "вперед"
    
    // Текущий активный слайд
    let currentIndex = 0;
    // ID интервала для авто-прокрутки
    let intervalId;

    /**
     * Показывает слайд с указанным индексом
     * @param {Number} index - Индекс слайда для отображения
     */
    function showItem(index) {
        // Перебираем все слайды и устанавливаем класс active только для текущего
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        // Обновляем текущий индекс
        currentIndex = index;
    }

    /**
     * Переключает на следующий слайд
     * Использует деление по модулю для зацикливания
     */
    function nextItem() {
        // Вычисляем индекс следующего слайда
        const newIndex = (currentIndex + 1) % items.length;
        showItem(newIndex);
    }

    /**
     * Переключает на предыдущий слайд
     * Использует деление по модулю для зацикливания
     */
    function prevItem() {
        // Вычисляем индекс предыдущего слайда
        const newIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(newIndex);
    }

    /**
     * Запускает автоматическую прокрутку слайдов
     */
    function startAutoPlay() {
        // Сначала останавливаем предыдущий интервал
        stopAutoPlay();
        // Устанавливаем новый интервал
        intervalId = setInterval(nextItem, interval);
    }

    /**
     * Останавливает автоматическую прокрутку
     */
    function stopAutoPlay() {
        clearInterval(intervalId);
    }

    // При клике на кнопку "вперед"
    nextBtn.addEventListener('click', () => {
        stopAutoPlay(); // Останавливаем авто-прокрутку
        nextItem();     // Показываем следующий слайд
        startAutoPlay(); // Перезапускаем авто-прокрутку
    });

    // При клике на кнопку "назад"
    prevBtn.addEventListener('click', () => {
        stopAutoPlay(); // Останавливаем авто-прокрутку
        prevItem();     // Показываем предыдущий слайд
        startAutoPlay(); // Перезапускаем авто-прокрутку
    });

    // При наведении курсора - останавливаем авто-прокрутку
    carousel.addEventListener('mouseenter', stopAutoPlay);
    
    // Когда курсор уходит - возобновляем авто-прокрутку
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Запускаем автоматическую прокрутку при инициализации
    startAutoPlay();
}