# Получить параметры раздела или список разделов универсального списка lists.section.get

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для нужного списка

Метод `lists.section.get` возвращает раздел или список разделов. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа инфоблока. Возможные значения: 
- `lists` — тип инфоблока списка 
- `bitrix_processes` — тип инфоблока процессов 
- `lists_socnet` — тип инфоблока списков групп ||
|| **IBLOCK_ID***
[`integer`](../../data-types.md) | Идентификатор инфоблока.

Идентификатор можно получить с помощью метода [lists.get](../lists/lists-get.md) ||
|| **IBLOCK_CODE*** 
[`string`](../../data-types.md) | Cимвольный код инфоблока.

Код можно получить с помощью метода [lists.get](../lists/lists-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `IBLOCK_ID` или `IBLOCK_CODE`

{% endnote %} ||
|| **FILTER**
[`object`](../../data-types.md) | Объект для фильтрации разделов `{"field_1": "value_1", ... "field_N": "value_N"}`. Фильтруемое поле может принимать значения:

- `ID` — идентификатор раздела  
- `CODE` — символьный код раздела  
- `XML_ID` — внешний идентификатор (XML ID)
- `EXTERNAL_ID` — внешний идентификатор раздела
- `NAME` — название раздела
- `ACTIVE` — признак активности
- `GLOBAL_ACTIVE` — глобальная активность
- `IBLOCK_ACTIVE` — признак активности инфоблока
- `IBLOCK_NAME` — название инфоблока
- `IBLOCK_TYPE` — идентификатор типа инфоблока
- `IBLOCK_XML_ID` — внешний идентификатор инфоблока (XML ID)
- `IBLOCK_EXTERNAL_ID` — внешний идентификатор инфоблока
- `DEPTH_LEVEL` — уровень вложенности
- `LEFT_MARGIN` — левая граница дерева
- `RIGHT_MARGIN` — правая граница дерева
- `LEFT BORDER` — левая граница
- `RIGHT BORDER` — правая граница
- `TIMESTAMP_X` — время последнего изменения
- `DATE_CREATE` — дата создания раздела  
- `CREATED_BY` — идентификатор пользователя, создавшего раздел  
- `MODIFIED_BY` — идентификатор пользователя, изменившего раздел  

Перед названием фильтруемого поля можно указать тип фильтрации:
- `!` — не равно
- `<` — меньше
- `<=` — меньше либо равно
- `>` — больше
- `>=` — больше либо равно
- `%` — поиск по подстроке

По умолчанию записи не фильтруются ||
|| **SELECT**
[`array`](../../data-types.md) | Массив с полями для выборки. Доступные поля:
- `ID` — идентификатор раздела
- `CODE` — символьный код раздела
- `XML_ID` — внешний идентификатор (XML ID)
- `EXTERNAL_ID` — внешний идентификатор раздела
- `IBLOCK_SECTION_ID` — идентификатор родительского раздела
- `TIMESTAMP_X` — время последнего изменения
- `SORT` — сортировка
- `NAME` — название раздела
- `ACTIVE` — признак активности
- `GLOBAL_ACTIVE` — глобальная активность
- `PICTURE` — картинка (устаревшее)
- `DESCRIPTION` — описание (устаревшее)
- `DESCRIPTION_TYPE` — тип описания (устаревшее)
- `LEFT_MARGIN` — левая граница дерева
- `RIGHT_MARGIN` — правая граница дерева
- `DEPTH_LEVEL` — уровень вложенности
- `SEARCHABLE_CONTENT` — поисковый контент
- `SECTION_PAGE_URL` — URL страницы (устаревшее)
- `MODIFIED_BY` — идентификатор пользователя, изменившего раздел
- `DATE_CREATE` — дата создания раздела
- `CREATED_BY` — идентификатор пользователя, создавшего раздел
- `DETAIL_PICTURE` — детальная картинка (устаревшее)
  
Если поля не указаны, возвращаются все доступные по умолчанию ||
|#

{% note info "" %}

Чтобы получить данные одного раздела, укажите его идентификатор в FILTER. Без фильтра метод вернет список всех разделов

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":95,"FILTER":{"ID":169,"ACTIVE":"Y","NAME":"%маркетинг%","<=DATE_CREATE":"2025-12-31",">=DATE_CREATE":"2025-01-01"},"SELECT":["ID","CODE","XML_ID","EXTERNAL_ID","IBLOCK_SECTION_ID","TIMESTAMP_X","SORT","NAME","ACTIVE","GLOBAL_ACTIVE","LEFT_MARGIN","RIGHT_MARGIN","DEPTH_LEVEL","SEARCHABLE_CONTENT","MODIFIED_BY","DATE_CREATE","CREATED_BY"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.section.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":95,"FILTER":{"ID":169,"ACTIVE":"Y","NAME":"%маркетинг%","<=DATE_CREATE":"2025-12-31",">=DATE_CREATE":"2025-01-01"},"SELECT":["ID","CODE","XML_ID","EXTERNAL_ID","IBLOCK_SECTION_ID","TIMESTAMP_X","SORT","NAME","ACTIVE","GLOBAL_ACTIVE","LEFT_MARGIN","RIGHT_MARGIN","DEPTH_LEVEL","SEARCHABLE_CONTENT","MODIFIED_BY","DATE_CREATE","CREATED_BY"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.section.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'lists.section.get',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: 95,
                FILTER: {
                    ID: 169,
                    ACTIVE: 'Y',
                    NAME: '%маркетинг%',
                    '>=DATE_CREATE': '2025-01-01',
                    '<=DATE_CREATE': '2025-12-31'
                },
                SELECT: [
                    'ID',
                    'CODE',
                    'XML_ID',
                    'EXTERNAL_ID',
                    'IBLOCK_SECTION_ID',
                    'TIMESTAMP_X',
                    'SORT',
                    'NAME',
                    'ACTIVE',
                    'GLOBAL_ACTIVE',
                    'LEFT_MARGIN',
                    'RIGHT_MARGIN',
                    'DEPTH_LEVEL',
                    'SEARCHABLE_CONTENT',
                    'MODIFIED_BY',
                    'DATE_CREATE',
                    'CREATED_BY',
                ]
            }
        );
        
        const result = response.getData().result;
        console.log('Retrieved sections:', result);
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'lists.section.get',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => 95,
                    'FILTER' => [
                        'ID' => 169,
                        'ACTIVE' => 'Y',
                        'NAME' => '%маркетинг%',
                        '>=DATE_CREATE' => '2025-01-01',
                        '<=DATE_CREATE' => '2025-12-31'
                    ],
                    'SELECT' => [
                        'ID',
                        'CODE',
                        'XML_ID',
                        'EXTERNAL_ID',
                        'IBLOCK_SECTION_ID',
                        'TIMESTAMP_X',
                        'SORT',
                        'NAME',
                        'ACTIVE',
                        'GLOBAL_ACTIVE',
                        'LEFT_MARGIN',
                        'RIGHT_MARGIN',
                        'DEPTH_LEVEL',
                        'SEARCHABLE_CONTENT',
                        'MODIFIED_BY',
                        'DATE_CREATE',
                        'CREATED_BY',
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
    'lists.section.get',
    {
        IBLOCK_TYPE_ID: 'lists',
        IBLOCK_ID: 95,
        
        FILTER: {
            'ID': 169,
            'ACTIVE': 'Y',
            'NAME': '%маркетинг%',
            '>=DATE_CREATE': '2025-01-01',
            '<=DATE_CREATE': '2025-12-31'
        },

        SELECT: [
            'ID',
            'CODE',
            'XML_ID',
            'EXTERNAL_ID',
            'IBLOCK_SECTION_ID',
            'TIMESTAMP_X',
            'SORT',
            'NAME',
            'ACTIVE',
            'GLOBAL_ACTIVE',
            'LEFT_MARGIN',
            'RIGHT_MARGIN',
            'DEPTH_LEVEL',
            'SEARCHABLE_CONTENT',
            'MODIFIED_BY',
            'DATE_CREATE',
            'CREATED_BY',
        ]
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
        'lists.section.get',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 95,
            'FILTER' => [
                'ID' => 169,
                'ACTIVE' => 'Y',
                'NAME' => '%маркетинг%',
                '>=DATE_CREATE' => '2025-01-01',
                '<=DATE_CREATE' => '2025-12-31'
            ],
            'SELECT' => [
                'ID',
                'CODE',
                'XML_ID',
                'EXTERNAL_ID',
                'IBLOCK_SECTION_ID',
                'TIMESTAMP_X',
                'SORT',
                'NAME',
                'ACTIVE',
                'GLOBAL_ACTIVE',
                'LEFT_MARGIN',
                'RIGHT_MARGIN',
                'DEPTH_LEVEL',
                'SEARCHABLE_CONTENT',
                'MODIFIED_BY',
                'DATE_CREATE',
                'CREATED_BY',
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
            "ID": "169",
            "CODE": "marketing_documents",
            "XML_ID": "ext_marketing_docs_002",
            "EXTERNAL_ID": "ext_marketing_docs_002",
            "IBLOCK_SECTION_ID": null,
            "TIMESTAMP_X": "10/27/2025 12:00:30 pm",
            "SORT": "600",
            "NAME": "Обновленные документы маркетинга",
            "ACTIVE": "Y",
            "GLOBAL_ACTIVE": "Y",
            "LEFT_MARGIN": "17",
            "RIGHT_MARGIN": "18",
            "DEPTH_LEVEL": "1",
            "SEARCHABLE_CONTENT": "ОБНОВЛЕННЫЕ ДОКУМЕНТЫ МАРКЕТИНГА\r\n",
            "MODIFIED_BY": "1269",
            "DATE_CREATE": "10/27/2025 11:36:56 am",
            "CREATED_BY": "1269"
        }
    ],
    "total": 1,
    "time": {
        "start": 1761556287,
        "finish": 1761556287.844517,
        "duration": 0.8445169925689697,
        "processing": 0,
        "date_start": "2025-10-27T12:11:27+03:00",
        "date_finish": "2025-10-27T12:11:27+03:00",
        "operating_reset_at": 1761556887,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Данные раздела или массив разделов. Результат зависит от параметра SELECT.

Пустой массив означает, что в списке нет разделов, либо разделы не соответствуют фильтру ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_REQUIRED_PARAMETERS_MISSING",
    "error_description":"Required parameter is missing"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для чтения раздела ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-section-add.md)
- [{#T}](./lists-section-update.md)
- [{#T}](./lists-section-delete.md)