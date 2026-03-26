# Добавить элемент в хранилище entity.item.add

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с уровнем права `X` (управление) или `W` (запись) в хранилище данных 

Метод `entity.item.add` добавляет элемент в хранилище данных приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %}


## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY**^*^
[`string`](../../data-types.md) | Идентификатор хранилища данных приложения. Используйте значение, которое указали при создании хранилища.

Получить идентификатор можно методом [entity.get](../entities/entity-get.md)||
|| **NAME**
[`string`](../../data-types.md) | Название элемента хранилища ||
|| **PROPERTY_VALUES**
[`object`](../../data-types.md) | Значения свойств элемента в формате `{"КОД_СВОЙСТВА": значение}`.

Обрабатываются только свойства, существующие в хранилище. Список доступных кодов свойств можно получить методом [entity.item.property.get](./properties/entity-item-property-get.md)

Для свойств типа файл используется формат из статьи [Как загрузить файлы](../../files/how-to-upload-files.md) ||
|| **SECTION**
[`integer`](../../data-types.md) | Идентификатор раздела хранилища ||
|| **DATE_ACTIVE_FROM**
[`datetime`](../../data-types.md) | Дата начала активности элемента ||
|| **DATE_ACTIVE_TO**
[`datetime`](../../data-types.md) | Дата окончания активности элемента ||
|| **PREVIEW_PICTURE**
[`file`](../../data-types.md) | Картинка анонса элемента. Формат файла — в статье [Как загрузить файлы](../../files/how-to-upload-files.md) ||
|| **DETAIL_PICTURE**
[`file`](../../data-types.md) | Детальная картинка элемента. Формат файла — в статье [Как загрузить файлы](../../files/how-to-upload-files.md) ||
|| **UF_**
[`any`](../../data-types.md) | Пользовательские поля элемента `UF_*`.

Передаются отдельными параметрами в формате `"UF_КОД": значение`, например: `"UF_CRM_1_COLOR": "red"`, `"UF_CRM_1_SIZE": 42` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример добавления элемента, где:
- `ENTITY` — идентификатор хранилища `dish`
- `NAME` — название элемента
- `PROPERTY_VALUES` — значения свойств
- `SECTION` — идентификатор раздела

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","NAME":"Hello, world!","PROPERTY_VALUES":{"test":11,"test1":22},"SECTION":219,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.item.add
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.add',
    		{
    			ENTITY: 'dish',
    			NAME: 'Hello, world!',
    			PROPERTY_VALUES: {
    				test: 11,
    				test1: 22,
    			},
    			SECTION: 219,
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
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
                'entity.item.add',
                [
                    'ENTITY' => 'dish',
                    'NAME' => 'Hello, world!',
                    'PROPERTY_VALUES' => [
                        'test' => 11,
                        'test1' => 22,
                    ],
                    'SECTION' => 219,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding entity item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.add',
        {
            ENTITY: 'dish',
            NAME: 'Hello, world!',
            PROPERTY_VALUES: {
                test: 11,
                test1: 22,
            },
            SECTION: 219,
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'entity.item.add',
        [
            'ENTITY' => 'dish',
            'NAME' => 'Hello, world!',
            'PROPERTY_VALUES' => [
                'test' => 11,
                'test1' => 22,
            ],
            'SECTION' => 219,
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
    "result": 2333,
    "time": {
        "start": 1774435185,
        "finish": 1774435185.636041,
        "duration": 0.6360409259796143,
        "processing": 0,
        "date_start": "2026-03-25T13:39:45+03:00",
        "date_finish": "2026-03-25T13:39:45+03:00",
        "operating_reset_at": 1774435785,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного элемента ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ENTITY_NOT_FOUND",
    "error_description": "Entity not found"
}
```

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument 'ENTITY' is null or empty",
    "argument": "ENTITY"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is N characters. | Слишком длинное значение `ENTITY` ||
|| `ERROR_ARGUMENT` | Ошибки валидатора полей элемента | Переданы невалидные входные поля ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для добавления элемента ||
|| `ACCESS_DENIED` | Access denied! Application context required | Нет контекста приложения (`clientId`) ||
|| `ERROR_CORE` | Internal error adding entity item. Try adding again. | Внутренняя ошибка при добавлении элемента ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-item-update.md)
- [{#T}](./entity-item-get.md)
- [{#T}](./entity-item-delete.md)
- [{#T}](./index.md)
