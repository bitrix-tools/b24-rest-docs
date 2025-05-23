# Принципы дизайна UI Kit Битрикс24

UI Kit Битрикс24 строится на идее **интерфейсного родства**: любое приложение, использующее UI Kit, должно выглядеть и ощущаться как продолжение платформы Битрикс24, а не как внешний сервис, встроенный через iframe.

Ключевые принципы, которые лежат в основе библиотеки:

## 1. Последовательность

Интерфейсные паттерны должны быть узнаваемыми и предсказуемыми для пользователей Битрикс24. Это означает:

- одинаковые отступы, размеры и сетки,
- повторяемая логика взаимодействия,
- унифицированные цвета и типографика.

Пользователь должен чувствовать себя «дома», независимо от того, в каком разделе платформы он находится.

## 2. Адаптивность и масштабируемость

Компоненты работают корректно на разных экранах — от ноутбуков до встроенных шторок в мобильных приложениях.

- Компоненты используют флюидные размеры.
- Адаптивность задается декларативно через Tailwind utility-классы, без ручных media-запросов.
- Есть возможность задавать адаптивное поведение прямо в шаблоне.

## 3. Инклюзивность и доступность

Все компоненты разрабатываются с учетом базовых требований доступности:

- правильная семантика HTML,
- поддержка клавиатурной навигации,
- понятные фокусы и aria-атрибуты,
- совместимость с темной темой.

## 4. Простота

Чем проще интерфейс — тем меньше когнитивная нагрузка на пользователя и тем легче разработчику собрать готовый экран:

- минимум лишней информации,
- логичная иерархия,
- разумные дефолты и поведение «из коробки».

## 5. Компонентность

Все в UI Kit построено как набор независимых Vue-компонентов, которые можно использовать поодиночке или собирать в шаблоны.

- Четкая изоляция.
- Расширяемость через props/slots.
- Комбинируемость по Lego-принципу.

## 6. Брендовая идентичность

UI Kit соблюдает визуальный язык Битрикс24 — цвета, иконки, форма кнопок, логика уведомлений и прочее соответствуют стилю основной платформы.

Это не просто библиотека, это продолжение интерфейса Битрикс24 в ваших приложениях.
