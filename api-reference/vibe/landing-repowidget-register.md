# Добавить виджет на Вайб landing.repowidget.register

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.repowidget.register` добавляет виджет для Вайба. Возвращает ошибку или идентификатор `ID` добавленного виджета.

При добавлении выполняется проверка. Если виджет с кодом `code` уже зарегистрирован ранее, то происходит обновление его контента. Виджеты, уже размещенные на Вайбах, в случае обновления контента обновляются автоматически.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **code***
[`string`](../data-types.md) | Уникальный код виджета. Настоятельно рекомендуется использовать какой-либо уникальный префикс для своих виджетов, чтобы избежать риск совпадения кодов с виджетами других разработчиков ||
|| **fields***
[`object`](../data-types.md) | Значения полей для создания виджета ||
|#

### Параметр fields {#anchor-fields}

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../data-types.md) | Название виджета ||
|| **PREVIEW**
[`string`](../data-types.md) | URL картинки-обложки виджета для слайдера выбора виджетов ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание виджета ||
|| **CONTENT**
[`string`](../data-types.md) | Верстка виджета с использованием конструкций Vue ||
|| **SECTIONS**
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
- `widgets_video` — Видео ||
|| **WIDGET_PARAMS**
[`object`](../data-types.md) | [Параметры](#anchor-widget-params) для vue-шаблонизатора. Если их нет, то блок останется обычным html-кодом с `{{}}` ||
|| **ACTIVE**
[`char`](../data-types.md) | Активность виджета. Принимает значения: 

- `Y` - виджет активен и доступен
- `N` - виджет неактивен и недоступен ||
|| **SITE_TEMPLATE_ID**
[`string`](../data-types.md) | Привязка виджета к определенному шаблону сайта. **Только для коробочного Битрикс24!** ||
|#

#### Параметр WIDGET_PARAMS  {#anchor-widget-params}

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **rootNode***
[`string`](../data-types.md) | Селектор корневого элемента в верстке, который будет превращен во vue-component. Корневой элемент должен быть единственным элементом в передаваемом шаблоне, вся остальная разметка будет очищена ||
|| **lang**
[`string`](../data-types.md) | Массив языковых фраз, использующихся в конструкциях `{{$Bitrix.Loc.getMessage('W_EMPTY')}}` ||
|| **handler***
[`string`](../data-types.md) | Адрес [внешнего обработчика](./index.md#anchor-handler), к которому будут выполняться запросы.

**Важно**: Обработчик должен быть доступен из внешней сети! Проверяйте доступность обработчика специальными сервисами

 ||
|| **style**
[`string`](../data-types.md) | Адрес стилей для виджета. Стили также могут быть заданы инлайново в разметке через привязку `:style="{borderBottom: '1px solid red'}"` ||
|| **demoData***
[`object`](../data-types.md) | Демо-данные для виджета, которые будут использованы для демонстрации виджета в шаблонах Вайба в [Битрикс24 Маркетплейс](../../market/index.md).

Если вы разрабатываете виджет для конкретного Битрикс24 и не планируете публиковать его в Маркет, то можете указать в качестве значения параметра произвольный массив, он все равно не будет использован.

Однако, если вы готовите тиражное решение с виджетом, уделите демонстрационным данным максимальное внимание — именно они будут отображаться в слайдере предварительного просмотра шаблона Вайба! Очевидно, что структура демо-данных должна соответствовать той, которую вернул бы ваш обработчик `handler` в обычном режиме использования виджета
 ||
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

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-repowidget-unregister.md)
- [{#T}](./landing-repowidget-get-list.md)
- [{#T}](./landing-repowidget-debug.md)
