# Объединить дубликаты crm.entity.mergeBatch

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: администратор

Метод `crm.entity.mergeBatch` объединяет несколько элементов в один. 

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **params***
[`object`](../../data-types.md) | Объект с элементами для объединения [(подробное описание)](#params) ||
|#

### Параметр params{#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../data-types.md) | Идентификатор [типа объекта CRM](../data-types.md#object_type). Возможные значения:
- `1` — [лид](../leads/index.md)
- `2` — [сделка](../deals/index.md)
- `3` — [контакт](../contacts/index.md)
- `4` — [компания](../companies/index.md)
- `7` — [предложение](../quote/index.md)
- `31` — [счет](../universal/invoice.md)
- `128` — [смарт-процесс](../universal/index.md). Идентификатор конкретного смарт-процесса можно узнать методами [crm.enum.ownertype](../auxiliary/enum/crm-enum-owner-type.md) и [crm.type.list](../universal/user-defined-object-types/crm-type-list.md) ||
|| **entityIds***
[`integer[]`](../../data-types.md) | Массив идентификаторов элементов, которые необходимо объединить. Минимум два элемента ||
|#

### Особенности работы метода

Объединять можно только элементы одного типа: лид с лидом, контакт с контактом, элемент смарт-процесса с ID 128 c элементом смарт-процесса с ID 128.

Полное автоматическое объединение доступно в нескольких случаях: 
- элементы идентичны друг другу,
- элементы не идентичны, но разница в значениях полей не требует ручной обработки. Например, в одном элементе поле заполнено, а в другом это же поле пустое — будет сохранено значение из заполненного поля.

Главным элементом при объединении будет тот, `ID` которого указан первым в массиве `entityIds`. В главный элемент будет перенесена информация из других элементов. Все элементы кроме главного будут удалены после успешного объединения. 

#### Ручное объединение при конфликте

Если метод возвращает статус `CONFLICT`, продолжить объединение можно вручную в интерфейсе Битрикс24 по ссылке:

- Контакты: `/crm/contact/merge/?id=1,2,3`
- Компании: `/crm/company/merge/?id=1,2,3`
- Лиды: `/crm/lead/merge/?id=1,2,3`
- Сделки: `/crm/deal/merge/?id=1,2,3`
  
Параметр `id` содержит идентификаторы объединяемых элементов через запятую.  

- Счета: `/crm/type/31/merge/?id[]=1&id[]=2`
- Предложения: `/crm/type/7/merge/?id[]=1&id[]=2`
- Смарт-процессы: `/crm/type/128/merge/?id[]=1&id[]=2`

Параметр `id[]` содержит идентификаторы объединяемых элементов, переданные в виде повторяющегося параметра.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"params":{"entityTypeId":3,"entityIds":[100,101,102]}}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.entity.mergeBatch
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"auth":"**put_access_token_here**","params":{"entityTypeId":3,"entityIds":[100,101,102]}}' \
         https://**put_your_bitrix24_address**/rest/crm.entity.mergeBatch
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.entity.mergeBatch',
    		{
    			params: {
    				entityTypeId: 3,
    				entityIds: [100, 101, 102]
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
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
                'crm.entity.mergeBatch',
                [
                    'params' => [
                        'entityTypeId' => 3,
                        'entityIds'    => [100, 101, 102]
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
        echo 'Error merging entities: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.entity.mergeBatch',
        {
            params: {
                entityTypeId: 3,
                entityIds: [100, 101, 102]
            }
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.entity.mergeBatch',
        [
            'params' => [
                'entityTypeId' => 3,
                'entityIds' => [100, 101, 102]
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
    "result": {
        "STATUS": "SUCCESS",
        "ENTITY_IDS": [101, 102]
    },
    "time": {
        "start": 1750754639.300838,
        "finish": 1750754641.350269,
        "duration": 2.049431085586548,
        "processing": 2.0271031856536865,
        "date_start": "2025-06-24T11:43:59+03:00",
        "date_finish": "2025-06-24T11:44:01+03:00",
        "operating_reset_at": 1750755239,
        "operating": 0
    }
}

```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **STATUS**
[`string`](../../data-types.md) | Статус выполнения операции. Возможные значения:
- `SUCCESS` — объединение прошло успешно
- `CONFLICT` — возник конфликт данных, автоматическое объединение невозможно
- `ERROR` — произошла [ошибка](#errors) ||
|| **ENTITY_IDS**
[`integer[]`](../../data-types.md) | Массив идентификаторов элементов, которые были удалены при объединении ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400** 

```json
{
    "error": 0,
    "error_description": "The parameter entityIds must contains at least two elements."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок {#errors}

#|
|| **Код** | **Описание** | **Значение** ||
|| `403` | `Access denied` | У пользователя нет прав на изменение или удаление элементов CRM ||
|| `400` | `The parameter entityTypeId is required.` | Не указан обязательный параметр `entityTypeId` ||
|| `400` | `The parameter entityIds does not contains valid elements.` | Не переданы или не найдены элементы для объединения ||
|| `400` | `The parameter entityIds must contains at least two elements.` | Для объединения требуется минимум два элемента ||
|| `400` | `Owner was not found` | Объект не найден ||
|| `400` | `Entity type {entityTypeName} is not supported` | Указан неподдерживаемый тип объекта ||
|| `400` | `CRM_FEATURE_RESTRICTION_ERROR` | Ограничение тарифа ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [crm.duplicate.findbycomm](./crm-duplicate-find-by-comm.md) 