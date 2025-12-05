# Получить данные универсального списка или массив списков lists.get


> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для списков

Метод `lists.get` возвращает универсальный список или массив списков.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа инфоблока. Возможные значения: 
- `lists` — тип инфоблока списка 
- `bitrix_processes` — тип инфоблока процессов 
- `lists_socnet` — тип инфоблока списков групп

Идентификатор можно получить с помощью метода [lists.get-iblock-type-id](./lists-get-iblock-type-id.md) ||
|| **IBLOCK_ID**
[`integer`](../../data-types.md) | Идентификатор инфоблока ||
|| **IBLOCK_CODE** 
[`string`](../../data-types.md) | Cимвольный код инфоблока

{% note info "" %}

При запросе без `IBLOCK_ID` или `IBLOCK_CODE` возвращаются все списки указанного типа, доступные пользователю

{% endnote %} ||
|| **SOCNET_GROUP_ID**
[`integer`](../../data-types.md) | Идентификатор группы. Обязателен для списков групп, иначе произойдет ошибка доступа.

Идентификатор можно получить с помощью методов [socialnetwork.api.workgroup.list](../../sonet-group/socialnetwork-api-workgroup-list.md), [sonet_group.get](../../sonet-group/sonet-group-get.md) и [sonet_group.user.groups](../../sonet-group/sonet-group-user-groups.md)
||
|| **IBLOCK_ORDER**
[`object`](../../data-types.md) | Объект для сортировки полей списка в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию 
  
Допустимые поля:
- `ID` - идентификатор списка
- `IBLOCK_TYPE` - тип инфоблока
- `NAME` - название списка
- `CODE` - символьный код списка
- `SORT` - сортировка
- `TIMESTAMP_X` - время последнего изменения

Значение по умолчанию — `decs`
||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists_socnet","SOCNET_GROUP_ID":33,"IBLOCK_ORDER":{"SORT":"asc","NAME":"asc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists_socnet","SOCNET_GROUP_ID":33,"IBLOCK_ORDER":{"SORT":"asc","NAME":"asc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod(
          'lists.get',
          {
              IBLOCK_TYPE_ID: 'lists_socnet',
              SOCNET_GROUP_ID: 33,
              IBLOCK_ORDER: {
                SORT: 'asc',
                NAME: 'asc'
              },
              start: 0
          }
      );

      const result = response.getData().result;
      console.log('Fetched lists:', result);
      processResult(result);
  } catch (error) {
      console.error('Error:', error);
  }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'lists.get',
                [
                    'IBLOCK_TYPE_ID' => 'lists_socnet',
                    'SOCNET_GROUP_ID' => 33,
                    'IBLOCK_ORDER' => [
                        'SORT' => 'asc',
                        'NAME' => 'asc'
                    ],
                    'start' => 0
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching lists: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
      'lists.get',
      {
         IBLOCK_TYPE_ID: 'lists_socnet',
         SOCNET_GROUP_ID: 33,
         IBLOCK_ORDER: {
           SORT: 'asc',
           NAME: 'asc'
         },
         start: 0
      },
         function(result) {
             if (result.error()) {
                console.error(result.error());
             } else {
                console.log(result.data());
             }
         }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.get',
        [
            'IBLOCK_TYPE_ID' => 'lists_socnet',
            'SOCNET_GROUP_ID' => 33,
            'IBLOCK_ORDER' => [
                'SORT' => 'asc',
                'NAME' => 'asc'
            ],
            'start' => 0
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
        "ID": "89",
        "TIMESTAMP_X": "05/17/2023 04:09:23 pm",
        "IBLOCK_TYPE_ID": "lists_socnet",
        "LID": "s1",
        "CODE": null,
        "API_CODE": null,
        "NAME": "Список группы",
        "ACTIVE": "Y",
        "SORT": "500",
        "LIST_PAGE_URL": null,
        "DETAIL_PAGE_URL": null,
        "SECTION_PAGE_URL": null,
        "CANONICAL_PAGE_URL": null,
        "PICTURE": null,
        "DESCRIPTION": "",
        "DESCRIPTION_TYPE": "text",
        "RSS_TTL": "24",
        "RSS_ACTIVE": "Y",
        "RSS_FILE_ACTIVE": "N",
        "RSS_FILE_LIMIT": null,
        "RSS_FILE_DAYS": null,
        "RSS_YANDEX_ACTIVE": "N",
        "XML_ID": null,
        "TMP_ID": null,
        "INDEX_ELEMENT": "Y",
        "INDEX_SECTION": "N",
        "WORKFLOW": "N",
        "BIZPROC": "Y",
        "SECTION_CHOOSER": "L",
        "LIST_MODE": null,
        "RIGHTS_MODE": "E",
        "SECTION_PROPERTY": null,
        "PROPERTY_INDEX": null,
        "VERSION": "1",
        "LAST_CONV_ELEMENT": "0",
        "SOCNET_GROUP_ID": "33",
        "EDIT_FILE_BEFORE": null,
        "EDIT_FILE_AFTER": null,
        "SECTIONS_NAME": "Разделы",
        "SECTION_NAME": "Раздел",
        "ELEMENTS_NAME": "Элементы",
        "ELEMENT_NAME": "Элемент",
        "REST_ON": "N",
        "FULLTEXT_INDEX": "N",
        "EXTERNAL_ID": null,
        "LANG_DIR": "/",
        "SERVER_NAME": null
        }
    ],
    "total": 1,
    "time": {
        "start": 1764694297,
        "finish": 1764694298.018582,
        "duration": 1.0185821056365967,
        "processing": 1,
        "date_start": "2025-12-02T15:51:37+03:00",
        "date_finish": "2025-12-02T15:51:38+03:00",
        "operating_reset_at": 1764694897,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Данные списка или массив списков.

Пустой массив означает, что списки не найдены ||
|| **total**
[`integer`](../../data-types.md) | Общее количество списков ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#


## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_REQUIRED_PARAMETERS_MISSING",
    "error_description":"Required parameter `X` is missing"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для чтения списка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-add.md)
- [{#T}](./lists-update.md)
- [{#T}](./lists-delete.md)
- [{#T}](./lists-get-iblock-type-id.md)