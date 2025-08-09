# Получить список виджетов landing.repowidget.getlist

> Scope: [`landing`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.repowidget.getlist` возвращает список виджетов текущего приложения, отобранных по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **params***
[`object`](../data-types.md) | Массив полей для получения списка виджетов ||
|#

### Параметр params

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../data-types.md) | Массив [со списком полей](#anchor-field), которые необходимо выбрать.

Если не передан или передан пустой массив, то будут выбраны все доступные доступные виджеты ||
|| **filter**
[`object`](../data-types.md) | Объект для фильтрации выбранных записей в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` смотрите [в таблице ниже](#anchor-field).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN (в качестве значения передаётся массив)
- `!@`— NOT IN (в качестве значения передаётся массив)
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - "мол%" — ищем значения, начинающиеся с «мол»
    - "%мол" — ищем значения, заканчивающиеся на «мол»
    - "%мол%" — ищем значения, где «мол» может быть в любой позиции

- `%=` — LIKE (см. описание выше)

- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.

- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - "мол%" — ищем значения, не начинающиеся с «мол»
    - "%мол" — ищем значения, не заканчивающиеся на «мол»
    - "%мол%" — ищем значения, где подстроки «мол» нет в любой позиции

- `!%=` — NOT LIKE (см. описание выше)

- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` - не равно
- `!` — не равно ||
|| **group**
[`array`](../data-types.md) | Массив для группировки виджетов. Группировать можно [по полям](#anchor-field) виджета ||
|| **order**
[`object`](../data-types.md) | Объект для сортировки выбранных записей в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` смотрите [в таблице ниже](#anchor-field).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания ||

|#

#### Поля field {#anchor-field}

Поля объекта виджета. Присутствуют в запросе и ответе.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор виджета ||
|| **XML_ID**
[`string`](../data-types.md) | Уникальный код записи ||
|| **APP_CODE**
[`string`](../data-types.md) | Код текущего приложения ||
|| **ACTIVE**
[`char`](../data-types.md) | Активность виджета. Принимает значения: 

- `Y` - виджет активен и доступен
- `N` - виджет неактивен и недоступен ||
|| **NAME**
[`string`](../data-types.md) | Название виджета ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание виджета ||
|| **SECTIONS**
[`string`](../data-types.md) | Код [раздела](./landing-repowidget-register.md#anchor-fields), в который будет добавлен виджет ||
|| **PREVIEW**
[`string`](../data-types.md) | URL картинки-обложки виджета для слайдера выбора виджетов ||
|| **WIDGET_PARAMS**
[`object`](../data-types.md) | [Параметры](./landing-repowidget-register.md#anchor-widget-params) для vue-шаблонизатора ||
|| **CONTENT**
[`string`](../data-types.md) | Верстка виджета с использованием конструкций Vue ||
|| **MANIFEST**
[`object`](../data-types.md) | Манифест виджета ||
|| **CREATED_BY_ID**
[`integer`](../data-types.md) | Идентификатор пользователя, создавшего запись ||
|| **MODIFIED_BY_ID**
[`integer`](../data-types.md) | Идентификатор пользователя, изменившего запись ||
|| **DATE_CREATE**
[`date`](../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`date`](../data-types.md) | Дата изменения ||
|| **SITE_TEMPLATE_ID**
[`string`](../data-types.md) | Привязка виджета к определенному шаблону сайта. **Только для коробочного Битрикс24!** ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'landing.repowidget.getlist',
        {
          params: {
            select: [
              'ID', 'NAME'
            ],
            filter: {
              '>ID': '1'
            }
          }
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('landing.repowidget.getlist', {
        params: {
          select: [
            'ID', 'NAME'
          ],
          filter: {
            '>ID': '1'
          }
        }
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('landing.repowidget.getlist', {
        params: {
          select: [
            'ID', 'NAME'
          ],
          filter: {
            '>ID': '1'
          }
        }
      }, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.repowidget.getlist',
                [
                    'params' => [
                        'select' => [
                            'ID', 'NAME'
                        ],
                        'filter' => [
                            '>ID' => '1'
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting repowidget list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repowidget.getlist',
        {
            params: {
                select: [
                    'ID', 'NAME' 
                ],
                filter: {
                    '>ID': '1'
                }
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.repowidget.getList',
        [
            'params' => [
                'select' => ['ID', 'NAME'],
                'filter' => [
                    '>ID' => '1'
                ]
            ]
        ]
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
    "result": [
        {
            "ID": "4",
            "XML_ID": "my_widget",
            "APP_CODE": "app.code",
            "ACTIVE": "Y",
            "NAME": "My widget",
            "DESCRIPTION": null,
            "SECTIONS": "widgets_company_life",
            "SITE_TEMPLATE_ID": null,
            "PREVIEW": "https://my-app.com/vibe_preview.jpg",
            "MANIFEST": {
                "block": {
                    "type": [
                        "mainpage"
                    ],
                    "subtype": [
                        "widgetvue"
                    ],
                    "subtype_params": {
                        "rootNode": ".w-container",
                        "demoData": {
                            "desc": "JustSome widget data",
                            "count": "420",
                        },
                        "handler": "https://my-app.com/vibe.php",
                        "style": "https://my-app.com/vibe.css",
                        "lang": {
                            "ru": {
                                "W_TITLE": "Люди и их возраст",
                                "W_EMPTY": "Нет людей"
                            },
                            "en": {
                                "W_TITLE": "Widget title",
                                "W_EMPTY": "Empty!"
                            }
                        }
                    }
                }
            },
            "CONTENT": "<div class=\"w-container\">not_var{{desc}}</div>",
            "CREATED_BY_ID": "1",
            "MODIFIED_BY_ID": "1",
            "DATE_CREATE": "10.10.2024 15:55:30",
            "DATE_MODIFY": "16.10.2024 16:12:57"
        }
    ],
    "time": {
        "start": 1729162340.81773,
        "finish": 1729162344.800994,
        "duration": 3.9832639694213867,
        "processing": 3.8990869522094727,
        "date_start": "2024-10-17T15:52:20+05:00",
        "date_finish": "2024-10-17T15:52:24+05:00",
        "operating": 3.899045944213867
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Массив виджетов. Каждый элемент массива — объект, допустимые поля описаны [выше](#anchor-field). ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-repowidget-register.md)
- [{#T}](./landing-repowidget-unregister.md)
- [{#T}](./landing-repowidget-debug.md)