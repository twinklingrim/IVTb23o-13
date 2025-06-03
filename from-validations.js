document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('python-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Сбрасываем предыдущие ошибки
        clearErrors();
        
        // Проверяем поля
        const usernameValid = validateUsername();
        const emailValid = validateEmail();
        const passwordValid = validatePassword();
        const levelValid = validateLevel();
        
        // Если все верно, отправляем форму
        if (usernameValid && emailValid && passwordValid && levelValid) {
            alert('Форма успешно отправлена! Добро пожаловать в клуб поклонников Python!');
            form.reset();
        }
    });
    
    function validateUsername() {
        const username = document.getElementById('username').value.trim();
        const errorElement = document.getElementById('username-error');
        
        if (username.length === 0) {
            showError(errorElement, 'Имя пользователя обязательно');
            return false;
        }
        
        if (username.length < 4) {
            showError(errorElement, 'Имя должно быть не менее 4 символов');
            return false;
        }
        
        if (!/^[a-zA-Zа-яА-Я0-9_]+$/.test(username)) {
            showError(errorElement, 'Можно использовать только буквы, цифры и подчеркивание');
            return false;
        }
        
        return true;
    }
    
    function validateEmail() {
        const email = document.getElementById('email').value.trim();
        const errorElement = document.getElementById('email-error');
        
        if (email.length === 0) {
            showError(errorElement, 'Email обязателен');
            return false;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError(errorElement, 'Введите корректный email');
            return false;
        }
        
        return true;
    }
    
    function validatePassword() {
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('password-error');
        
        if (password.length === 0) {
            showError(errorElement, 'Пароль обязателен');
            return false;
        }
        
        if (password.length < 8) {
            showError(errorElement, 'Пароль должен быть не менее 8 символов');
            return false;
        }
        
        if (!/[A-ZА-Я]/.test(password)) {
            showError(errorElement, 'Пароль должен содержать хотя бы одну заглавную букву');
            return false;
        }
        
        if (!/[0-9]/.test(password)) {
            showError(errorElement, 'Пароль должен содержать хотя бы одну цифру');
            return false;
        }
        
        return true;
    }
    
    function validateLevel() {
        const level = document.getElementById('python-level').value;
        const errorElement = document.getElementById('level-error');
        
        if (level === '') {
            showError(errorElement, 'Укажите ваш уровень знаний Python');
            return false;
        }
        
        return true;
    }
    
    function showError(element, message) {
        element.textContent = message;
        element.previousElementSibling.classList.add('invalid');
    }
    
    function clearErrors() {
        // Очищаем сообщения об ошибках
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // Убираем подсветку ошибок
        document.querySelectorAll('input, select').forEach(el => {
            el.classList.remove('invalid');
        });
    }
    
    // Валидация при потере фокуса
    document.getElementById('username').addEventListener('blur', validateUsername);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('password').addEventListener('blur', validatePassword);
    document.getElementById('python-level').addEventListener('change', validateLevel);
});