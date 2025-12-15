# Сбросить параметры карточки элементов crm.item.details.configuration.reset

> Название метода: **crm.item.details.configuration.reset**
>
> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: проверка прав при выполнении метода зависит от переданных данных:
>   - Любой пользователь имеет право сбросить свои личные настройки
>   - Пользователь имеет право сбрасывать общие и чужие настройки только если он является администратором

Метод сбрасывает настройки карточки элемента до значений по умолчанию. Удаляет личные настройки карточки указанного пользователя или общие настройки, заданные для всех пользователей.

{% include [Памятка о extras](./_includes/extras_notice.md) %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](./../../index.md) или [пользовательского типа](./../user-defined-object-types/index.md) объектов CRM ||
|| **userId**
[`user`][1] | Идентификатор пользователя, чью конфигурацию вы хотите сбросить.

Если параметр не передан, то будет взят `userId` пользователя, вызывающего этот метод.

Нужен только при запросе личных настроек
||
|| **scope**
[`string`][1] | Область применения настроек. Допустимые значения:
- `'P'` — личные настройки
- `'C'` — общие настройки

По умолчанию значение равно `'P'` ||
|| **extras**
[`object`][1] | Дополнительные параметры. Возможные значения и их структура описана [ниже](#extras) ||
|#

### extras

Параметр в `extras` зависит от объекта CRM.

#|
|| **Объект CRM** | **Название** | **Описание** ||
|| **Смарт-процесс** | `categoryId` | Идентификатор воронки смарт-процессов. Можно получить с помощью [`crm.category.list`](./../category/crm-category-list.md).

Если не указано, то берется идентификатор воронки по умолчанию для данного смарт-процесса ||
|| **Сделка** | `dealCategoryId` | Идентификатор воронки сделок. Можно получить с помощью [`crm.category.list`](./../category/crm-category-list.md).

Если не указан, то берется идентификатор воронки по умолчанию для сделок ||
|| **Лид** | `leadCustomerType` | Тип лидов. 

Возможные значения:
- `1` — простые лиды
- `2` — повторные лиды
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Сбросить общую конфигурацию для карточек сделок в воронке с `id = 9` для пользователя с `id = 1`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"userId":1,"scope":"C","extras":{"dealCategoryId":9}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.details.configuration.reset
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"userId":1,"scope":"C","extras":{"dealCategoryId":9},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.details.configuration.reset
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.details.configuration.reset',
    		{
    			entityTypeId: 2,
    			userId: 1,
    			scope: "C",
    			extras: {
    				dealCategoryId: 9,
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.item.details.configuration.reset',
                [
                    'entityTypeId' => 2,
                    'userId'       => 1,
                    'scope'        => "C",
                    'extras'       => [
                        'dealCategoryId' => 9,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            return;
        }
    
        echo 'Success: ' . print_r($result->data(), true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error resetting details configuration: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
        BX24.callMethod(
            'crm.item.details.configuration.reset',
            {
                entityTypeId: 2,
                userId: 1,
                scope: "C",
                extras: {
                    dealCategoryId: 9,
                },
            },
            (result) => {
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

    $result = CRest::call(
        'crm.item.details.configuration.reset',
        [
            'entityTypeId' => 2,
            'userId' => 1,
            'scope' => 'C',
            'extras' => [
                'dealCategoryId' => 9,
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
    "result": true,
    "time": {
        "start": 1720687072.190654,
        "finish": 1720687072.586945,
        "duration": 0.39629101753234863,
        "processing": 0.057084083557128906,
        "date_start": "2024-07-11T10:37:52+02:00",
        "date_finish": "2024-07-11T10:37:52+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`][1] | Корневой элемент ответа. Возвращает `true` в случае успешного сброса настроек ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Parameter 'entityTypeId' is not defined"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок
#|
|| **Код** | **Описание** | **Значение** ||
|| Пустое значение | Parameter 'entityTypeId' is not defined | Не передан обязательный параметр `entityTypeId` ||
|| Пустое значение | The entity type '`entityTypeName`' is not supported in current context. | Метод не поддерживает данный тип сущности ||
|| Пустое значение | Access denied. | У пользователя нет административных прав ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-item-details-configuration-get.md)
- [{#T}](./crm-item-details-configuration-set.md)
- [{#T}](./crm-item-details-configuration-forceCommonScopeForAll.md)

[1]: ../../../data-types.md
