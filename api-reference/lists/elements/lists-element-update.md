# Изменить элемент списка lists.element.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы

{% endnote %}

{% endif %}

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `lists.element.update` обновляет элемент списка. В случае успешного обновления элемента ответ `true`, иначе *Exception*.

{% note warning %}

Все поля элемента и их значения должны передаваться в запросе.

{% endnote %}


## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_TYPE_ID***
[`unknown`](../../data-types.md) | `id` типа инфоблока:
- `lists` — тип инфоблока списка
- `bitrix_processes` — тип инфоблока процессов
- `lists_socnet` — тип инфоблока списков групп ||
|| **IBLOCK_CODE/IBLOCK_ID***
[`unknown`](../../data-types.md) | Код или `id` инфоблока ||
|| **ELEMENT_CODE/ELEMENT_ID***
[`unknown`](../../data-types.md) | Код или `id` элемента ||
|| **FIELDS**
[`unknown`](../../data-types.md) | Массив полей и значений. В поле типа Файл `F` нельзя передавать идентификатор файла с Диска ||
|| **SOCNET_GROUP_ID***
[`unknown`](../../data-types.md) | `id` группы. Параметр обязателен, если список создается для группы ||
|#

## Примеры

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists_socnet","IBLOCK_CODE":"rest_1","ELEMENT_CODE":"element_1","FIELDS":{"NAME":"Test element (Update)","PROPERTY_62":{"599":"Text string (Update)"},"PROPERTY_63":{"600":"73","601":"97","602":"17"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.element.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists_socnet","IBLOCK_CODE":"rest_1","ELEMENT_CODE":"element_1","FIELDS":{"NAME":"Test element (Update)","PROPERTY_62":{"599":"Text string (Update)"},"PROPERTY_63":{"600":"73","601":"97","602":"17"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.element.update
    ```

- JS

    ```js
    var params = {
        'IBLOCK_TYPE_ID': 'lists_socnet',
        'IBLOCK_CODE': 'rest_1',
        'ELEMENT_CODE': 'element_1',
        'FIELDS': {
            'NAME': 'Test element (Update)',
            'PROPERTY_62': {
            '599': 'Text string (Update)'
            },
            'PROPERTY_63': {
            '600': '73',
            '601': '97',
            '602': '17'
            }
        }
    };
    BX24.callMethod(
        'lists.element.update',
        params,
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Success: " + result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.element.update',
        [
            'IBLOCK_TYPE_ID' => 'lists_socnet',
            'IBLOCK_CODE' => 'rest_1',
            'ELEMENT_CODE' => 'element_1',
            'FIELDS' => [
                'NAME' => 'Test element (Update)',
                'PROPERTY_62' => [
                    '599' => 'Text string (Update)'
                ],
                'PROPERTY_63' => [
                    '600' => '73',
                    '601' => '97',
                    '602' => '17'
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Как загрузить файл в поле типа Файл (Диск)

1. Используйте rest api модуля disk: `disk.folder.uploadfile` и `disk.storage.uploadfile`. В ответе при загрузке этих файлов вы получите `"ID": 290`.
2. Получите список `ID` загруженных файлов.
3. С помощью rest api модуля lists добавьте файлы в нужное поле. Если у поля уже есть прикрепленные файлы, вам нужно получить предыдущие значения из [lists.element.get](./lists-element-get.md) и передать их вместе с новыми.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"41","ELEMENT_CODE":"element1","FIELDS":{"NAME":"Test element 1","PROPERTY_121":{"4754":["50","n1582"]}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.element.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"41","ELEMENT_CODE":"element1","FIELDS":{"NAME":"Test element 1","PROPERTY_121":{"4754":["50","n1582"]}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.element.update
    ```

- JS

    ```js
    var params = {
        'IBLOCK_TYPE_ID': 'lists',
        'IBLOCK_ID': '41',
        'ELEMENT_CODE': 'element1',
        'FIELDS': {
            'NAME': 'Test element 1',
            'PROPERTY_121': {'4754': ['50', 'n1582']} // либо без id 'PROPERTY_121': {'n0': ['50', 'n1582']}
        }
    };
    BX24.callMethod(
        'lists.element.update',
        params,
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Success: " + result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.element.update',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => '41',
            'ELEMENT_CODE' => 'element1',
            'FIELDS' => [
                'NAME' => 'Test element 1',
                'PROPERTY_121' => ['4754' => ['50', 'n1582']]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Значения в поле Файл (Диск) без префикса `"n"` — это уже прикрепленные файлы (`attachedId`), а с префиксом — ваши новые файлы, уже загруженные предварительно на диск.

### Как удалить файл

Узнайте ID значений файлов с помощью метода [lists.element.get](./lists-element-get.md).

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"bitrix_processes","IBLOCK_ID":47}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.element.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"bitrix_processes","IBLOCK_ID":47,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.element.get
    ```

- JS

    ```js
    BX.rest.callMethod(
        'lists.element.get', {IBLOCK_TYPE_ID: 'bitrix_processes', IBLOCK_ID: 47}
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.element.get',
        [
            'IBLOCK_TYPE_ID' => 'bitrix_processes',
            'IBLOCK_ID' => 47
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Вы получите ответ следующего вида.

```json
"result": [
    {
        "ID": "480",
        "IBLOCK_ID": "47",
        "NAME": "1",
        "IBLOCK_SECTION_ID": null,
        "CREATED_BY": "1",
        "BP_PUBLISHED": "Y",
        "CODE": "",
        "PROPERTY_133": {
            "2857": "375",
            "2858": "376"
        }
    }
],
```

Здесь `PROPERTY_133` — множественное поле типа Файл. Представляет собой объект, где ключ — это `ID` значения свойства, который понадобится для удаления, а значение — это `ID` файла.

Чтобы удалить значение свойства, передайте в метод `lists.element.update` поле с постфиксом `_DEL`. В нем укажите список значений, которые нужно удалить. В качестве ключа пропишите `ID` значения свойства, а в качестве значения — `"Y"`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"bitrix_processes","IBLOCK_ID":47,"ELEMENT_ID":480,"FIELDS":{"NAME":"1","PROPERTY_133_DEL":{"2857":"Y"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.element.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"bitrix_processes","IBLOCK_ID":47,"ELEMENT_ID":480,"FIELDS":{"NAME":"1","PROPERTY_133_DEL":{"2857":"Y"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.element.update
    ```

- JS

    ```js
    BX.rest.callMethod(
        'lists.element.update', {
        IBLOCK_TYPE_ID: 'bitrix_processes',
        IBLOCK_ID: 47,
        ELEMENT_ID: 480,
        FIELDS: { NAME: '1', PROPERTY_133_DEL: {"2857": "Y"} }
    }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.element.update',
        [
            'IBLOCK_TYPE_ID' => 'bitrix_processes',
            'IBLOCK_ID' => 47,
            'ELEMENT_ID' => 480,
            'FIELDS' => [
                'NAME' => '1',
                'PROPERTY_133_DEL' => ["2857" => "Y"]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

