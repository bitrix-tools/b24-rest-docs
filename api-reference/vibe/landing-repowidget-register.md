# Добавить виджет для Вайба landing.repowidget.register

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь при вызове из приложения, при вызове вебхуком — администратор

Метод `landing.repowidget.register` добавляет виджет для Вайба.

Если приложение уже регистрировало виджет с этим `code`, метод обновит его контент. Экземпляры, размещенные на Вайбах, обновятся автоматически.

Регистрируйте виджет из приложения: у виджета, зарегистрированного вебхуком, обработчик не вызывается. Подробнее — в [обзоре методов](./index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **code***
[`string`](../data-types.md) | Код виджета, уникальный в пределах приложения. Виджеты разных приложений с одинаковым кодом не конфликтуют ||
|| **fields***
[`object`](../data-types.md) | Значения полей для создания виджета [(подробное описание)](#anchor-fields) ||
|#

### Параметр fields {#anchor-fields}

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../data-types.md) | Название виджета ||
|| **PREVIEW***
[`string`](../data-types.md) | URL картинки-обложки виджета для слайдера выбора виджетов ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание виджета ||
|| **CONTENT***
[`string`](../data-types.md) | Верстка виджета с использованием конструкций Vue ||
|| **SECTIONS***
[`string`](../data-types.md) | Код раздела, в который будет добавлен виджет. Список доступных разделов:

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
- `widgets_video` — Видео
- `widgets_tiles` — Кнопки и ссылки
- `widgets_columns` — Колонки
- `widgets_text_image` — Текст с картинками ||
|| **WIDGET_PARAMS***
[`object`](../data-types.md) | [Параметры](#anchor-widget-params) для шаблонизатора Vue ||
|| **ACTIVE**
[`char`](../data-types.md) | Активность виджета. Принимает значения:

- `Y` — виджет активен и доступен
- `N` — виджет неактивен и недоступен

По умолчанию — `Y` ||
|| **SITE_TEMPLATE_ID**
[`string`](../data-types.md) | Привязка виджета к определенному шаблону сайта. **Только для коробочного Битрикс24!** ||
|#

#### Параметр WIDGET_PARAMS  {#anchor-widget-params}

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **rootNode***
[`string`](../data-types.md) | Селектор корневого элемента в верстке `CONTENT`, который будет превращен в компонент Vue. Вся верстка должна быть внутри корневого элемента. Если селектор не найдет элемент в `CONTENT`, виджет не отрисуется ||
|| **lang**
[`object`](../data-types.md) | Языковые фразы для конструкций `{{$Bitrix.Loc.getMessage('W_EMPTY')}}` в формате `{"код языка": {"КОД_ФРАЗЫ": "текст"}}`, например `{"ru": {"W_EMPTY": "Нет данных"}, "en": {"W_EMPTY": "No data"}}`.

Виджет берет фразы для языка интерфейса пользователя, если их нет — для `en` ||
|| **handler***
[`string`](../data-types.md) | Адрес [внешнего обработчика](./index.md#anchor-handler), к которому будут выполняться запросы.

Требования к адресу:

- абсолютный URL, доступный из внешней сети
- протокол `https` для нового или измененного адреса
- не адрес loopback или локальной сети

Если адрес не подходит, метод вернет ошибку `WIDGET_HANDLER_INVALID`. Требования к ответу обработчика описаны в разделе [Запрос к обработчику и его ответ](./index.md#handler-request) ||
|| **style**
[`string`](../data-types.md) | Адрес стилей для виджета. Стили также могут быть заданы инлайново в разметке через привязку `:style="{borderBottom: '1px solid red'}"` ||
|| **demoData***
[`object`](../data-types.md) | Демо-данные для виджета. Они отображаются в слайдере предварительного просмотра шаблона Вайба в [Маркете](../../market/index.md), поэтому их структура должна совпадать с ответом обработчика `handler`.

Если виджет не будет опубликован в Маркете, передайте произвольный объект ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    const content = '<div class="my-app-w-container"><!-- Vue template --></div>'

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'landing.repowidget.register',
        params: {
          code: 'my_widget',
          fields: {
            NAME: 'My widget',
            PREVIEW: 'https://my-app.com/vibe_preview.jpg',
            CONTENT: content,
            SECTIONS: 'widgets_company_life',
            WIDGET_PARAMS: {
              rootNode: '.my-app-w-container',
              lang: {
                ru: {
                  W_TITLE: 'People and their ages',
                  W_EMPTY: 'No data',
                },
                en: {
                  W_TITLE: 'People and their ages',
                  W_EMPTY: 'Empty',
                },
              },
              handler: 'https://my-app.com/vibe.php',
              style: 'https://my-app.com/vibe.css',
              demoData: {
                desc: 'Just a test widget',
                count: 420,
                persons: [
                  { name: 'Person 1', age: 21 },
                  { name: 'Person 2', age: 42 },
                  { name: 'Person 3', age: 123 },
                ],
              },
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Registered widget ID:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function registerVibeWidget() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const content = '<div class="my-app-w-container"><!-- Vue template --></div>'

          const response = await $b24.actions.v2.call.make({
            method: 'landing.repowidget.register',
            params: {
              code: 'my_widget',
              fields: {
                NAME: 'My widget',
                PREVIEW: 'https://my-app.com/vibe_preview.jpg',
                CONTENT: content,
                SECTIONS: 'widgets_company_life',
                WIDGET_PARAMS: {
                  rootNode: '.my-app-w-container',
                  lang: {
                    ru: {
                      W_TITLE: 'People and their ages',
                      W_EMPTY: 'No data',
                    },
                    en: {
                      W_TITLE: 'People and their ages',
                      W_EMPTY: 'Empty',
                    },
                  },
                  handler: 'https://my-app.com/vibe.php',
                  style: 'https://my-app.com/vibe.css',
                  demoData: {
                    desc: 'Just a test widget',
                    count: 420,
                    persons: [
                      { name: 'Person 1', age: 21 },
                      { name: 'Person 2', age: 42 },
                      { name: 'Person 3', age: 123 },
                    ],
                  },
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Registered widget ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', registerVibeWidget)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    content = '<div class="my-app-w-container"><!-- Vue template --></div>'

    try:
        bitrix_response = client.landing.repowidget.register(
            code="my_widget",
            fields={
                "NAME": "My widget",
                "PREVIEW": "https://my-app.com/vibe_preview.jpg",
                "CONTENT": content,
                "SECTIONS": "widgets_company_life",
                "WIDGET_PARAMS": {
                    "rootNode": ".my-app-w-container",
                    "lang": {
                        "ru": {
                            "W_TITLE": "People and their ages",
                            "W_EMPTY": "No data",
                        },
                        "en": {
                            "W_TITLE": "People and their ages",
                            "W_EMPTY": "Empty",
                        },
                    },
                    "handler": "https://my-app.com/vibe.php",
                    "style": "https://my-app.com/vibe.css",
                    "demoData": {
                        "desc": "Some people...",
                        "persons": [
                            {
                                "name": "Person 1",
                                "age": 21,
                            },
                            {
                                "name": "Person 2",
                                "age": 42,
                            },
                            {
                                "name": "Person 3",
                                "age": 123,
                            },
                        ],
                    },
                },
            },
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.repowidget.register',
                [
                    'code'    => 'my_widget',
                    'fields'  => [
                        'NAME'         => 'My widget',
                        'PREVIEW'      => 'https://my-app.com/vibe_preview.jpg',
                        'CONTENT'      => $content,
                        'SECTIONS'     => 'widgets_company_life',
                        'WIDGET_PARAMS' => [
                            'rootNode' => '.my-app-w-container',
                            'lang'     => [
                                'ru' => [
                                    'W_TITLE' => 'Люди и их возраст',
                                    'W_EMPTY' => 'Нет людей',
                                ],
                                'en' => [
                                    'W_TITLE' => 'People and their ages',
                                    'W_EMPTY' => 'Empty',
                                ],
                            ],
                            'handler'   => 'https://my-app.com/vibe.php',
                            'style'     => 'https://my-app.com/vibe.css',
                            'demoData'  => [
                                'desc'    => 'Just a test widget',
                                'count'   => 420,
                                'persons' => [
                                    ['name' => 'Person 1', 'age' => 21],
                                    ['name' => 'Person 2', 'age' => 42],
                                    ['name' => 'Person 3', 'age' => 123],
                                ],
                            ],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error registering repowidget: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const content = `
        <div class="my-app-w-container">
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
            PREVIEW: 'https://my-app.com/vibe_preview.jpg',
            CONTENT: content,
            SECTIONS: 'widgets_company_life',
            WIDGET_PARAMS: {
                rootNode: '.my-app-w-container',
                lang: {
                    ru: {
                        W_TITLE: 'Люди и их возраст',
                        W_EMPTY: 'Нет людей',
                    },
                    en: {
                        W_TITLE: 'People and their ages',
                        W_EMPTY: 'Empty',
                    },
                },
                handler: 'https://my-app.com/vibe.php',
                style: 'https://my-app.com/vibe.css',
                demoData: {
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

- PHP CRest

    ```php
    require_once('crest.php');

    $content = <<<'HTML'
        <div class="my-app-w-container">
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
            'PREVIEW' => 'https://my-app.com/vibe_preview.jpg', 
            'CONTENT' => $content,  // Vue-разметка вынесена в отдельную переменную для удобства
            'SECTIONS' => 'widgets_company_life', 
            'WIDGET_PARAMS' => [
                'rootNode' => '.my-app-w-container',
                'lang' => [
                    'ru' => [
                        'W_TITLE' => 'Люди и их возраст',
                        'W_EMPTY' => 'Нет людей',
                    ],
                    'en' => [
                        'W_TITLE' => 'People and their ages',
                        'W_EMPTY' => 'Empty!',
                    ],
                ],
                'handler' => 'https://my-app.com/vibe.php',
                'style' => 'https://my-app.com/vibe.css',
                'demoData' => [
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
[`integer`](../data-types.md) | Идентификатор добавленного виджета ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"REQUIRED_FIELD_NO_EXISTS",
    "error_description":"Отсутствует обязательное поле CONTENT"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `REQUIRED_FIELD_NO_EXISTS` | Отсутствует обязательное поле CONTENT | В параметре `fields` не передано обязательное поле: `NAME`, `PREVIEW`, `CONTENT`, `SECTIONS` или `WIDGET_PARAMS`. Имя поля подставляется в текст ошибки ||
|| `400` | `REQUIRED_PARAM_NO_EXISTS` | Отсутствует обязательный параметр виджета handler | В параметре `WIDGET_PARAMS` не передан обязательный параметр: `rootNode`, `handler` или `demoData`. Имя параметра подставляется в текст ошибки ||
|| `400` | `WIDGET_HANDLER_INVALID` | Недопустимый адрес обработчика в параметре WIDGET_PARAMS.handler | Адрес `handler` не соответствует требованиям из описания [параметра](#anchor-widget-params) ||
|| `400` | `CONTENT_IS_BAD` | Содержимое блока определено как небезопасное | Верстка `CONTENT` не прошла проверку безопасности. Проверить ее можно методом [landing.repo.checkContent](../landing/user-blocks/landing-repo-check-content.md) ||
|| `400` | `ACCESS_DENIED` | Недостаточно прав для изменения репозитория блоков | Метод вызван вебхуком, а пользователь не администратор ||
|| `400` | `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: fields | Не передан параметр `code` или `fields` ||
|| `400` | `TYPE_ERROR` | Неверный тип аргумента вызова: fields | Параметр `fields` передан не объектом ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-repowidget-get-list.md)
- [{#T}](./landing-repowidget-unregister.md)
- [{#T}](./landing-repowidget-debug.md)
- [{#T}](./index.md)
