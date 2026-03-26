# Удалить свойство элементов хранилища entity.item.property.delete

> Scope: [`entity`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с уровнем права `X` (управление) на хранилище данных

Метод `entity.item.property.delete` удаляет свойство элементов хранилища данных приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../../../settings/app-installation/index.md).

{% endnote %}


## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY**^*^
[`string`](../../../data-types.md) | Идентификатор хранилища данных приложения. Используйте значение, которое указали при создании хранилища.

Получить идентификатор можно методом [entity.get](../../entities/entity-get.md) ||
|| **PROPERTY**^*^
[`string`](../../../data-types.md) | Код свойства, которое нужно удалить.

Получить код свойства можно методом [entity.item.property.get](./entity-item-property-get.md)||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример удаления свойства, где:
- `ENTITY` — идентификатор хранилища `dish`
- `PROPERTY` — код свойства `new_prop`

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","PROPERTY":"new_prop","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.item.property.delete
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.property.delete',
    		{
    			ENTITY: 'dish',
    			PROPERTY: 'new_prop',
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
                'entity.item.property.delete',
                [
                    'ENTITY' => 'dish',
                    'PROPERTY' => 'new_prop',
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
        echo 'Error deleting entity item property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.property.delete',
        {
            ENTITY: 'dish',
            PROPERTY: 'new_prop',
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
        'entity.item.property.delete',
        [
            'ENTITY' => 'dish',
            'PROPERTY' => 'new_prop',
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
    "result": true,
    "time": {
        "start": 1774441734,
        "finish": 1774441734.535435,
        "duration": 0.5354349613189697,
        "processing": 0,
        "date_start": "2026-03-25T15:28:54+03:00",
        "date_finish": "2026-03-25T15:28:54+03:00",
        "operating_reset_at": 1774442334,
        "operating": 0.11034393310546875
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат удаления свойства (`true` — успешно) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_PROPERTY_NOT_FOUND",
    "error_description": "Property not found"
}
```

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument 'ENTITY' is null or empty",
    "argument": "ENTITY"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is N characters. | Слишком длинное значение `ENTITY` ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ERROR_PROPERTY_NOT_FOUND` | Property not found | Свойство с переданным `PROPERTY` не найдено ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для удаления свойства ||
|| `ACCESS_DENIED` | Access denied! Application context required | Нет контекста приложения (`clientId`) ||
|| `ERROR_CORE` | Internal error deleting entity property. Try deleting again. | Внутренняя ошибка при удалении свойства ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-item-property-get.md)
- [{#T}](./entity-item-property-add.md)
- [{#T}](./entity-item-property-update.md)
- [{#T}](./index.md)
