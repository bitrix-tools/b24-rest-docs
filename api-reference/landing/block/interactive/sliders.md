# Слайдеры

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Для слайдера в [манифесте блока](../manifest.md) подключите расширение `landing_carousel`.

## Как настроить слайдер

Минимальный вариант:

```php
'assets' => [
    'ext' => ['landing_carousel'],
],
```

```html
<div class="js-carousel">
    <div class="js-slide">Slide 1</div>
    <div class="js-slide">Slide 2</div>
</div>
```

## Что делает расширение slider

Расширение `landing_carousel` инициализирует слайдер для контейнера `js-carousel` и обрабатывает атрибуты `data-*`, управляющие отображением, навигацией и автопрокруткой.

## Разметка

В разметке используются два служебных класса:

- `js-carousel` — корневой контейнер слайдера
- `js-slide` — отдельный слайд

По умолчанию слайдер показывает один слайд, без стрелок, пагинации и автопрокрутки. Поведение настраивается через `data-*` атрибуты на элементе `js-carousel`.

## Основные атрибуты

- `data-arrows-classes` — классы для обеих стрелок
- `data-arrow-left-classes` — классы для левой стрелки
- `data-arrow-right-classes` — классы для правой стрелки
- `data-pagi-classes` — классы для блока пагинации
- `data-slides-show` — количество слайдов на экране
- `data-slides-scroll` — количество слайдов за один шаг
- `data-autoplay` — включение/выключение автопрокрутки
- `data-speed` — скорость автопрокрутки в миллисекундах
- `data-pause-hover` — остановка автопрокрутки при наведении
- `data-fade` — эффект смены слайдов через прозрачность, корректно работает при `data-slides-show="1"`
- `data-vertical` — вертикальный режим слайдера
- `data-rows` — количество строк
- `data-infinite` — зацикливание
- `data-responsive` — адаптивные правила по брейкпоинтам
- `data-center-mode` — центрирование активного слайда
- `data-center-padding` — отступы по краям в режиме center mode
- `data-variable-width` — слайды переменной ширины
- `data-initial-slide` — начальный слайд при загрузке
- `data-rtl` — направление отображения справа налево
- `data-adaptive-height` — адаптивная высота контейнера по текущему слайду
- `data-lazy-load` — режим ленивой загрузки изображений
- `data-nav-for` — связь с другим слайдером, например, слайдер превью
- `data-is-thumbs` — режим слайдера-превью

Для `data-responsive` передается валидный JSON-массив правил. У каждого правила есть:

- `breakpoint` — ширина экрана в пикселях
- `settings` — настройки для данного брейкпоинта

В `settings` используются имена параметров Slick, а не `data-*` атрибутов:

- `arrows` — показать или скрыть стрелки
- `prevArrow` — HTML/селектор левой стрелки
- `nextArrow` — HTML/селектор правой стрелки
- `dots` — включить или выключить пагинацию
- `dotsClass` — CSS-класс контейнера пагинации
- `slidesToShow` — количество слайдов на экране
- `slidesToScroll` — количество слайдов за один шаг
- `autoplay` — включить или выключить автопрокрутку
- `autoplaySpeed` — интервал автопрокрутки в миллисекундах
- `pauseOnHover` — останавливать автопрокрутку при наведении
- `fade` — режим смены слайдов через затухание
- `vertical` — вертикальный режим слайдера

## Пример

```html
<div class="js-carousel"
    data-arrows-classes="u-arrow-v1 g-absolute-centered--y g-width-45 g-height-45 g-color-white g-bg-primary"
    data-arrow-left-classes="fa fa-chevron-left g-left-0"
    data-arrow-right-classes="fa fa-chevron-right g-right-0"
    data-pagi-classes="u-carousel-indicators-v1 g-absolute-centered--x g-bottom-60 text-center"
    data-slides-show="3"
    data-slides-scroll="2"
    data-autoplay="true"
    data-speed="1000"
    data-pause-hover="true"
    data-center-mode="true"
    data-center-padding="40px"
    data-initial-slide="1"
    data-adaptive-height="true"
    data-lazy-load="ondemand"
    data-responsive='[
        {
            "breakpoint": 768,
            "settings": {
                "slidesToShow": 2
            }
        },
        {
            "breakpoint": 576,
            "settings": {
                "slidesToShow": 1
            }
        }
    ]'>

    <div class="js-slide g-height-50vh g-brd-gray-light-v3 g-brd-around g-bg-primary-opacity-0_1">
        <div class="g-flex-centered w-100 h-100">
            <h3>Slide 1</h3>
        </div>
    </div>

    <div class="js-slide g-height-50vh g-brd-gray-light-v3 g-brd-around g-bg-primary-opacity-0_1">
        <div class="g-flex-centered w-100 h-100">
            <h3>Slide 2</h3>
        </div>
    </div>
</div>
```

## Совмещение с галереей

Если слайдер используется вместе с галереей, подключайте расширения в порядке:

1. `landing_carousel`
2. `landing_gallery_cards`

```php
'assets' => [
    'ext' => ['landing_carousel', 'landing_gallery_cards'],
],
```

## Примеры штатных блоков

Примеры блоков этого типа можно посмотреть в репозитории через методы [landing.block.getmanifestfile](../methods/landing-block-get-manifest-file.md) и [landing.block.getrepository](../methods/landing-block-get-repository.md).

Коды некоторых штатных блоков:

- `01.big_with_text`
- `01.big_with_text_blocks`
- `28.5.team_4_cols_slider`
- `39.1.five_blocks_carousel`
- `45.2.gallery_app_with_slider` — с галереей

## Что важно учитывать

- `data-fade` корректно работает при `data-slides-show="1"`
- в режиме `data-rows` параметры `data-slides-show` и `data-slides-scroll` работают как число колонок
- для вертикального режима `data-vertical` обычно отдельно настраивают стрелки/пагинацию
- при включенном `data-vertical` одновременно включается `verticalSwiping`, поэтому на мобильных обычно настраивают отключение вертикального режима через `data-responsive`
- для отображения пагинации кроме настроек dots нужно задать `data-pagi-classes`
- `data-infinite` работает в режиме предпросмотра и публикации; в редакторе зацикливание принудительно отключается
- при совмещении со встроенной галереей сначала подключается `landing_carousel`, затем `landing_gallery_cards`

## Продолжите изучение

- [Галереи](./gallery.md)
- [Счетчики обратного отсчета](./timer.md)
- [Файл манифеста блока](../manifest.md)
- [Типы нод](../node-types.md)
