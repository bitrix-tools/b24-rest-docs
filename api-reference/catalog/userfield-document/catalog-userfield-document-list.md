# Получить список значений пользовательских полей документов складского учета catalog.userfield.document.list

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.userfield.document.list` возвращает постраничный список значений пользовательских полей документов складского учета.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select***
[`array`](../../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать (смотрите поля объекта [catalog_userfield_document](../data-types.md#catalog_userfield_document)).

Обязательно добавьте `documentType` — [тип документа складского учета](../enum/catalog-enum-get-store-document-types.md) ||
|| **filter***
[`object`](../../data-types.md) | Объект для фильтрации выбранных записей в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_userfield_document](../data-types.md#catalog_userfield_document).

Обязательно укажите `documentType` — [тип документа складского учета](../enum/catalog-enum-get-store-document-types.md).

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение, используется по умолчанию
- `!=` — не равно
- `!` — не равно
||
|| **order**
[`object`](../../data-types.md) | Объект сортировки в формате `{"field_1": "order_1", ..., "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_userfield_document](../data-types.md#catalog_userfield_document).

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания

Если параметр не передан, применяется сортировка `documentId ASC` ||
|| **start** 
[`integer`](../../data-types.md)| Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
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
    -d '{"select":["documentType","documentId","field7097"],"filter":{"documentType":"A","documentId":81},"order":{"documentId":"ASC"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.userfield.document.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["documentType","documentId","field7097"],"filter":{"documentType":"A","documentId":81},"order":{"documentId":"ASC"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.userfield.document.list
    ```

- JS

    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.

    try {
    const response = await $b24.callListMethod(
        'catalog.userfield.document.list',
        {
        select: ['documentType', 'documentId', 'field7097'],
        filter: { documentType: 'A', documentId: 81 },
        order: { documentId: 'ASC' },
        start: 0
        },
        (progress) => { console.log('Progress:', progress) }
    );
    const items = response.getData() || [];
    for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
    console.error('Request failed', error)
    }

    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.

    try {
    const generator = $b24.fetchListMethod('catalog.userfield.document.list', {
        select: ['documentType', 'documentId', 'field7097'],
        filter: { documentType: 'A', documentId: 81 },
        order: { documentId: 'ASC' },
        start: 0
    }, 'ID');
    for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
    }
    } catch (error) {
    console.error('Request failed', error)
    }

    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.

    try {
    const response = await $b24.callMethod('catalog.userfield.document.list', {
        select: ['documentType', 'documentId', 'field7097'],
        filter: { documentType: 'A', documentId: 81 },
        order: { documentId: 'ASC' },
        start: 0
    }, 0);
    const result = response.getData().result || [];
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
                'catalog.userfield.document.list',
                [
                    'select' => ['documentType', 'documentId', 'field7097'],
                    'filter' => ['documentType' => 'A', 'documentId' => 81],
                    'order' => ['documentId' => 'ASC'],
                    'start' => 0
                ]
            );

        print_r($response->getResponseData()->getResult());
    } catch (\Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.userfield.document.list',
        {
            select: ['documentType', 'documentId', 'field7097'],
            filter: { documentType: 'A', documentId: 81 },
            order:  { documentId: 'ASC' },
            start:  0
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
        'catalog.userfield.document.list',
        [
            'select' => ['documentType', 'documentId', 'field7097'],
            'filter' => ['documentType' => 'A', 'documentId' => 81],
            'order' => ['documentId' => 'ASC'],
            'start' => 0
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "documents": [
        {
            "documentId": 81,
            "documentType": "A",
            "field7097": "Тестовое поле"
        }
        ]
    },
    "total": 1,
    "time": {
        "start": 1774343822,
        "finish": 1774343822.822166,
        "duration": 0.8221659660339355,
        "processing": 0,
        "date_start": "2026-03-24T12:17:02+03:00",
        "date_finish": "2026-03-24T12:17:02+03:00",
        "operating_reset_at": 1774344422,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **documents**
[`catalog_userfield_document[]`](../data-types.md#catalog_userfield_document) | Список объектов со значениями пользовательских полей документов. Состав полей зависит от параметра `select` ||
|| **next**
[`integer`](../../data-types.md) | Смещение для следующей страницы. Поле возвращается, если есть еще записи ||
|| **total**
[`integer`](../../data-types.md) | Общее число записей. Поле не возвращается, если запрос выполнен со `start = -1` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "The documentType field is not specified in the filter parameter"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | The documentType field is not specified in the select parameter | В параметре `select` не указан `documentType` ||
|| `0` | The documentType field is not specified in the filter parameter | В параметре `filter` не указан `documentType` ||
|| `0` | Access Denied | Недостаточно прав для чтения значений пользовательских полей документов ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-userfield-document-update.md)
- [{#T}](../enum/catalog-enum-get-store-document-types.md)
- [{#T}](../../crm/universal/userfieldconfig/userfieldconfig/userfieldconfig-list.md)
