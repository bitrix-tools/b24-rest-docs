# Добавить виджет в репозиторий landing.repowidget.register

{% note warning "Мы еще работаем над инструментом" %}

Функционал будет выпущен в ближайшее время

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.repowidget.register` добавляет партнерский виджет для Главной страницы. Возвращает ошибку или `ID` добавленного виджета.

При добавлении выполняется проверка. Если виджет с данным кодом уже присутствует в системе, то происходит обновление его контента. Ранее добавленные виджеты сами обновляются на Главной странице.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **code***
[`string`](../../data-types.md) | Уникальный код партнерского виджета ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания виджета ||
|| **manifest**
[`array`](../../data-types.md) | Массив [манифеста](../block/manifest.md) виджета. Разрешено указывать только настройки стилей и редактируемые ноды ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../../data-types.md) | Название виджета ||
|| **PREVIEW**
[`string`](../../data-types.md) | URL картинки-обложки виджета ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание виджета ||
|| **CONTENT**
[`string`](../../data-types.md) | Содержимое виджета в виде vue-конструкций ||
|| **SECTIONS**
[`string`](../../data-types.md) | Код раздела, в который будет добавлен виджет. Список доступных разделов:
- `widgets_company_life` — Жизнь компании
- `widgets_new_employees` — Новым сотрудникам
- `widgets_team` — Команда
- `widgets_automation` — Автоматизация
- `widgets_events` — Встречи и события
- `widgets_profile` — Профиль сотрудника
- `widgets_tasks` — Задачи и проекты
- `widgets_sales` — Продажи и клиенты
- `widgets_hr` — HR
- `widgets_other` — Другое
- `widgets_separators` — Переходы и разделители
- `widgets_text` — Текст
- `widgets_image` — Картинки
- `widgets_video` — Видео ||
|| **WIDGET_PARAMS**
[`object`](../../data-types.md) | [Параметры](#anchor-widget-params) для vue-шаблонизатора. Если их нет, то блок останется обычным html-кодом с `{{}}` ||
|| **ACTIVE**
[`char`](../../data-types.md) | Активность виджета (Y\|N)||
|| **SITE_TEMPLATE_ID**
[`string`](../../data-types.md) | Привязка виджета к определенному шаблону сайта. *Только для коробочных версий!* ||
|#

#### Параметр WIDGET_PARAMS  {#anchor-widget-params}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **rootNode***
[`string`](../../data-types.md) | Селектор корневого элемента в разметке, который будет превращен во vue-component. Корневой элемент должен быть единственным элементом в передаваемом шаблоне, вся остальная разметка будет очищена ||
|| **lang**
[`string`](../../data-types.md) | Массив языковых фраз, использующихся в конструкциях `{{$Bitrix.Loc.getMessage('W_EMPTY')}}` ||
|| **handler***
[`string`](../../data-types.md) | Адрес [внешнего обработчика](./index.md#anchor-handler), к которому будут выполняться запросы ||
|| **style**
[`string`](../../data-types.md) | Адрес стилей для виджета. Стили также могут быть заданы инлайново в разметке через привязку `:style="{borderBottom: '1px solid red'}"` ||
|| **data**
[`array`](../../data-types.md) | Данные для первичного отображения виджета. В массиве должны содержаться все реактивные переменные, используемые в шаблоне. Если это условие не будет выполнено, то vue-конструкции, такие как `v-if="persons == null"`, могут приводить к ошибке при отсутствии параметра `persons`.

Если данные не переданы, то перед отрисовкой виджета будет выполнен запрос к `handler` без параметров ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    const content = `
        <div class="w-container">
            <h2 class="w-title" :style="{borderBottom: '1px solid red'}">
                {{$Bitrix.Loc.getMessage('W_TITLE')}}
            </h2>
            
            <h3>Description: not_var{{desc}}</h3>
            
            <div v-for="(value) in persons">
                <p>
                    <span class="w-name">not_var{{value.name}}</span>:
                    <span class="w-age">not_var{{value.age}}</span>
                </p>
            </div>
            
            <div v-if="persons == null">
                {{$Bitrix.Loc.getMessage('W_EMPTY')}}
            </div>
            
            <h4>Just a number not_var{{count}}</h4>
            
            <div class="w-buttons">
                <button @click="fetch">Получить данные (без параметров)</button>
                <button @click="fetch({param: 'a'})">Данные для параметра 'a'</button>
                <button @click="fetch({param: 'b'})">Данные для параметра 'b'</button>
                <button @click="openApplication({param1: '1', param2: 'false'})">Открыть приложение</button>
                <button @click="openPath('/crm')">Открыть локальный адрес в слайдере</button>
            </div>
        </div>
    `;

    const data = {
        code: 'my_widget',
        fields: {
            NAME: 'My widget',
            PREVIEW: 'https://cp.local/vibe_preview.jpg',
            CONTENT: content,
            SECTIONS: 'widgets_company_life',
            WIDGET_PARAMS: {
                rootNode: '.w-container',
                lang: {
                    ru: {
                        W_TITLE: 'Люди и их возраст',
                        W_EMPTY: 'Нет людей',
                    },
                    en: {
                        W_TITLE: 'Widget title',
                        W_EMPTY: 'Empty!',
                    },
                },
                handler: 'https://cp.local/vibe.php',
                style: 'https://cp.local/vibe.css',
                data: {
                    desc: 'Just a test widget',
                    count: 420,
                    persons: [
                        {'name': 'Person 1', 'age': 21},
                        {'name': 'Person 2', 'age': 42},
                        {'name': 'Person 3', 'age': 123},
                    ],
                },
            },
        },
    };

    BX24.callMethod(
        'landing.repowidget.register',
        data,
        (result) =>
        {
            if (result.error())
            {
                console.error(result.error());

                return;
            }

            console.info(result.data());
        },
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $content = <<<'HTML'
        <div class="w-container">
            <h2 class="w-title" :style="{borderBottom: '1px solid red'}">
                {{$Bitrix.Loc.getMessage('W_TITLE')}}
            </h2>
            
            <h3>Description: not_var{{desc}}</h3>
            
            <div v-for="(value) in persons">
                <p>
                    <span class="w-name">not_var{{value.name}}</span>: 
                    <span class="w-age">not_var{{value.age}}</span>
                </p>
            </div>
            
            <div v-if="persons == null">
                {{$Bitrix.Loc.getMessage('W_EMPTY')}}
            </div>
            
            <h4>Just a number not_var{{count}}</h4>
            
            <div class="w-buttons">
                <button @click="fetch">Получить данные (без параметров)</button>
                <button @click="fetch({param: 'a'})">Данные для параметра 'a'</button>
                <button @click="fetch({param: 'b'})">Данные для параметра 'b'</button>
                <button @click="openApplication({param1: '1', param2: 'false'})">Открыть приложение</button>
                <button @click="openPath('/crm')">Открыть локальный адрес в слайдере</button>
            </div>
        </div>
    HTML;

    $data = [
        'code' => 'my_widget',
        'fields' => [
            'NAME' => 'My widget', 
            'PREVIEW' => 'https://cp.local/vibe_preview.jpg', 
            'CONTENT' => $content,  // Vue-разметка вынесена в отдельную переменную для удобства
            'SECTIONS' => 'widgets_company_life', 
            'WIDGET_PARAMS' => [
                'rootNode' => '.w-container',
                'lang' => [
                    'ru' => [
                        'W_TITLE' => 'Люди и их возраст',
                        'W_EMPTY' => 'Нет людей',
                    ],
                    'en' => [
                        'W_TITLE' => 'Widget title',
                        'W_EMPTY' => 'Empty!',
                    ],
                ],
                'handler' => 'https://cp.local/vibe.php',
                'style' => 'https://cp.local/vibe.css',
                'data' => [
                    'desc' => 'Just a test widget',
                    'count' => 420,
                    'persons' => [
                        [
                            'name' => 'Person 1',
                            'age' => 21,
                        ],
                        [
                            'name' => 'Person 2',
                            'age' => 42,
                        ],
                        [
                            'name' => 'Person 3',
                            'age' => 123,
                        ],
                    ],
                ],
            ],
        ],
    ];

    $result = CRest::call(
        'landing.repowidget.register',
        $data
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 10,
    "time": {
        "start": 1713949410.036288,
        "finish": 1713949411.632775,
        "duration": 1.596487045288086,
        "processing": 0.6458539962768555,
        "date_start": "2024-04-24T11:03:30+02:00",
        "date_finish": "2024-04-24T11:03:31+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор добавленного виджета ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-repowidget-unregister.md)