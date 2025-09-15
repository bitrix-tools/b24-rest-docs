# Получить список пользовательских полей user.userfield.list

> Scope: [`user.userfield`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `user.userfield.list` получает список пользовательских полей по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`string`](../../data-types.md)\|[`array`](../../data-types.md) | Сортировка выбранных пользовательских полей в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field_N`:

- `ID` — идентификатор пользовательского поля
- `FIELD_NAME` — название поля
- `USER_TYPE_ID` — тип данных поля
- `XML_ID` — внешний код
- `SORT` — порядок сортировки поля
- `MULTIPLE` — возможность ввода нескольких значений
- `MANDATORY` — обязательность заполнения
- `SHOW_FILTER` — показ поля в фильтре списка пользователей
- `SHOW_IN_LIST` — показ поля в списке пользователей
- `EDIT_IN_LIST` — возможность редактирования поля в списке пользователей
- `IS_SEARCHABLE` — возможность поиска по полю

Возможные значения для `order_N`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
 ||
|| **filter** 
[`array`](../../data-types.md)| Фильтр выбранных пользовательских полей в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field_N` аналогичны полям в сортировке.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN (в качестве значения передается массив)
- `!@` — NOT IN (в качестве значения передается массив)
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки.
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения начинающиеся с «мол»
  - `"%мол"` — ищем значения заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения не начинающиеся с «мол»
  - `"%мол"` — ищем значения не заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"id":"desc"},"filter":{"id":13}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/user.userfield.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"id":"desc"},"filter":{"id":13},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/user.userfield.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'user.userfield.list',
        {
          order: {
            id: 'desc',
          },
          filter: {
            id: 13
          },
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
      const generator = $b24.fetchListMethod('user.userfield.list', {
        order: {
          id: 'desc',
        },
        filter: {
          id: 13
        },
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('user.userfield.list', {
        order: {
          id: 'desc',
        },
        filter: {
          id: 13
        },
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
                'user.userfield.list',
                [
                    'order' => [
                        'id' => 'desc',
                    ],
                    'filter' => [
                        'id' => 13
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
        echo 'Error fetching user fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "user.userfield.list",
        {
            order: {
                id: 'desc',
            },
            filter: {
                id: 13
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.userfield.list',
        [
            'order' => [
                'id' => 'desc',
            ]
            'filter' => [
                'id' => 13,
            ],
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
    "result":[
        {
            "ID":"176",
            "ENTITY_ID":"USER",
            "FIELD_NAME":"UF_USR_1724228142162",
            "USER_TYPE_ID":"enumeration",
            "XML_ID":null,
            "SORT":"100",
            "MULTIPLE":"Y",
            "MANDATORY":"N",
            "SHOW_FILTER":"E",
            "SHOW_IN_LIST":"Y",
            "EDIT_IN_LIST":"Y",
            "IS_SEARCHABLE":"N",
            "SETTINGS":{
                "DISPLAY":"UI",
                "LIST_HEIGHT":1,
                "CAPTION_NO_VALUE":"",
                "SHOW_NO_VALUE":"Y"
            },
            "LIST":[
                {
                    "ID":"26",
                    "SORT":"0",
                    "VALUE":"1",
                    "DEF":"N",
                    "XML_ID":"2a53ce08b86a6aba152b1b19204fdef2"
                },
                {
                    "ID":"27",
                    "SORT":"100",
                    "VALUE":"2",
                    "DEF":"N",
                    "XML_ID":"292df2be1171ed6ab038996deac29ac8"
                },
                {
                    "ID":"28",
                    "SORT":"200",
                    "VALUE":"3",
                    "DEF":"N",
                    "XML_ID":"3c5af70eafbba79a6cf52e299ed75123"
                }
            ]
        },
        {
            "ID":"177",
            "ENTITY_ID":"USER",
            "FIELD_NAME":"UF_USR_MONEY",
            "USER_TYPE_ID":"money",
            "XML_ID":null,
            "SORT":"100",
            "MULTIPLE":"N",
            "MANDATORY":"N",
            "SHOW_FILTER":"N",
            "SHOW_IN_LIST":"Y",
            "EDIT_IN_LIST":"Y",
            "IS_SEARCHABLE":"N",
            "SETTINGS":{
                "DEFAULT_VALUE":""
            }
        }
    ],
    "total":2,
    "time":{
        "start":1747313326.788124,
        "finish":1747313328.641663,
        "duration":1.853538990020752,
        "processing":0.011211156845092773,
        "date_start":"2025-05-15T14:48:46+02:00",
        "date_finish":"2025-05-15T14:48:48+02:00",
        "operating":0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{	
   "error":"",
   "error_description":"Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустая строка | Access denied. | Поле с таким `id` не существует или доступ запрещен ||
|| Пустая строка | ID is not defined or invalid | Не задан или введен неверный `id` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-userfield-add.md)
- [{#T}](./user-userfield-update.md)
- [{#T}](./user-userfield-delete.md)