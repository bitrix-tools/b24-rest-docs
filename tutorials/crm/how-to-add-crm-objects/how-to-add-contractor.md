# Как создать поставщика в CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на создание контактов или компаний в CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Поставщики — это контакты и компании CRM с признаком системной категории:

- `CATALOG_CONTRACTOR_CONTACT` — для контакта,
- `CATALOG_CONTRACTOR_COMPANY` — для компании.

Чтобы создать поставщика, последовательно выполним два метода:

1. [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) — получим идентификатор категории для контакта или компании.
2. [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) — создадим контакт или компанию как поставщика.

## 1. Получим идентификатор категории поставщика

Используем метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с параметрами:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Укажем `3` для контактов. Для компаний используйте `4`.
- `filter[code]` — фильтр по коду категории. Укажем `CATALOG_CONTRACTOR_CONTACT` для контакта. Для компаний используйте `CATALOG_CONTRACTOR_COMPANY`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS
  
    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const result = await $b24.actions.v2.call.make({
        method: 'crm.category.list',
        params: {
            entityTypeId: 3,
            filter: {
                code: 'CATALOG_CONTRACTOR_CONTACT'
            }
        }
    });

    console.log(result.getData().result);
    ```

- PHP
  
    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $result = $serviceBuilder->core->call(
        'crm.category.list',
        [
            'entityTypeId' => 3,
            'filter' => [
                'code' => 'CATALOG_CONTRACTOR_CONTACT'
            ]
        ]
    );
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client


    client = Client(BitrixWebhook(domain="your-domain.bitrix24.com", webhook_token="user_id/webhook_key"))

    response = client.crm.category.list(
        entity_type_id=3,
    ).response
    categories = [
        category
        for category in response.result.get("categories", [])
        if category.get("code") == "CATALOG_CONTRACTOR_CONTACT"
    ]

    print(categories)
    ```

{% endlist %}

В результате получим идентификатор категории. В примере `id`:`15`. Идентификатор может отличаться на разных Битрикс24.

```json
{
  "result": {
    "categories": [
      {
        "id": 15,
        "name": "Контакты поставщика",
        "entityTypeId": 3,
        "isSystem": "Y",
        "code": "CATALOG_CONTRACTOR_CONTACT"
      }
    ]
  }
}
```

## 2. Создадим поставщика

Используем метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) с параметрами:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Укажем `3` для контактов. Для компаний используйте `4`.

- `fields[categoryId]` — идентификатор системной категории из шага 1. В примере `15`.

- `fields[name]` — имя.
- `fields[lastName]` — фамилия. Для компании вместо имени и фамилии можно передать поле `fields[title]` — название.

- `fields[fm]` — массив мультиполей [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield) для телефона и email.
- `fields[comments]` — комментарий.
 
Телефон и email система хранит как массив мультиполей `fm`. Каждый элемент массива содержит:

- `typeId` — тип мультиполя, `PHONE` или `EMAIL`,
- `valueType` — тип значения, например `WORK` или `MOBILE`,
- `value` — значение поля.

{% list tabs %}

- JS
  
    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.item.add',
        params: {
            entityTypeId: 3,
            fields: {
                name: 'Иван',
                lastName: 'Иванов',
                categoryId: 15,  // id из шага 1
                fm: [
                    { typeId: 'PHONE', valueType: 'WORK', value: '+7 900 000 00 00' },
                    { typeId: 'PHONE', valueType: 'MOBILE', value: '+7 495 111 22 33' },
                    { typeId: 'EMAIL', valueType: 'WORK', value: 'supplier@example.ru' }
                ],
                comments: 'Поставщик электроники'
            }
        }
    });

    if (!result.isSuccess) {
        console.error(result.getErrorMessages().join('; '));
    } else {
        console.log(result.getData().result);
    }
    ```

- PHP
  
    ```php
    $result = $serviceBuilder->getCRMScope()->item()->add(
        3,
        [
            'name' => 'Иван',
            'lastName' => 'Иванов',
            'categoryId' => 15, // id из шага 1
            'fm' => [
                [ 'typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => '+7 900 000 00 00' ],
                [ 'typeId' => 'PHONE', 'valueType' => 'MOBILE', 'value' => '+7 495 111 22 33' ],
                [ 'typeId' => 'EMAIL', 'valueType' => 'WORK', 'value' => 'supplier@example.ru' ]
            ],
            'comments' => 'Поставщик электроники'
        ]
    );
    ```

- Python

    ```python
    response = client.crm.item.add(
        entity_type_id=3,
        fields={
            "name": "Иван",
            "lastName": "Иванов",
            "categoryId": 15,
            "fm": [
                {"typeId": "PHONE", "valueType": "WORK", "value": "+7 900 000 00 00"},
                {"typeId": "PHONE", "valueType": "MOBILE", "value": "+7 495 111 22 33"},
                {"typeId": "EMAIL", "valueType": "WORK", "value": "supplier@example.ru"},
            ],
            "comments": "Поставщик электроники",
        },
    ).response

    print(response.result)
    ```

{% endlist %}

В результате метод вернет объект `item` с данными созданного поставщика.

```json
{
    "result": {
        "item": {
            "id": 2449,
            "createdTime": "2025-12-29T13:18:40+03:00",
            "updatedTime": "2025-12-29T13:18:40+03:00",
            "createdBy": 1,
            "updatedBy": 1,
            "assignedById": 1,
            "opened": "Y",
            "companyId": null,
            "name": "Иван",
            "lastName": "Иванов",
            "secondName": null,
            "shortName": null,
            "photo": null,
            "post": null,
            "address": null,
            "comments": "Поставщик электроники",
            "leadId": null,
            "export": "Y",
            "webformId": null,
            "originatorId": null,
            "originId": null,
            "originVersion": null,
            "birthdate": null,
            "honorific": null,
            "hasPhone": "Y",
            "hasEmail": "Y",
            "hasImol": "N",
            "searchContent": null,
            "categoryId": 15,
            "lastActivityBy": 1,
            "lastActivityTime": "2025-12-29T13:18:40+03:00",
            "login": null,
            "emailHome": null,
            "emailWork": null,
            "emailMailing": null,
            "phoneMobile": null,
            "phoneWork": null,
            "phoneMailing": null,
            "imol": null,
            "email": null,
            "phone": null,
            "lastCommunicationTime": null,
            "lastCommunicationCallTime": null,
            "lastCommunicationEmailTime": null,
            "lastCommunicationImolTime": null,
            "lastCommunicationWebformTime": null,
            "observers": [],
            "companyIds": [],
            "entityTypeId": 3,
            "fm": [
                {
                    "id": 8297,
                    "valueType": "WORK",
                    "value": "+7 900 000 00 00",
                    "typeId": "PHONE"
                },
                {
                    "id": 8299,
                    "valueType": "MOBILE",
                    "value": "+7 495 111 22 33",
                    "typeId": "PHONE"
                },
                {
                    "id": 8301,
                    "valueType": "WORK",
                    "value": "supplier@example.ru",
                    "typeId": "EMAIL"
                }
            ]
        }
    },
    "time": {
        "start": 1767003520,
        "finish": 1767003520.776535,
        "duration": 0.7765350341796875,
        "processing": 0,
        "date_start": "2025-12-29T13:18:40+03:00",
        "date_finish": "2025-12-29T13:18:40+03:00",
        "operating_reset_at": 1767004120,
        "operating": 0.4402291774749756
    }
}
```

Идентификатор поставщика, в примере `id`: `2449`, используйте в методе складского учета [catalog.documentcontractor.add](../../../api-reference/catalog/documentcontractor/catalog-documentcontractor-add.md).

## Пример кода

{% list tabs %}

- JS
  
    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    var entityTypeId = 3; // 3 - контакт; для компании укажите 4
    var categoryCode = 'CATALOG_CONTRACTOR_CONTACT'; // для компании укажите CATALOG_CONTRACTOR_COMPANY
    var categoryId = null;

    const resultCategory = await $b24.actions.v2.call.make({
        method: 'crm.category.list',
        params: {
            entityTypeId: entityTypeId,
            filter: { code: categoryCode }
        }
    });

    if (!resultCategory.isSuccess) {
        console.error(resultCategory.getErrorMessages().join('; '));
    } else {
        var categories = resultCategory.getData().result.categories || [];
        if (!categories.length) {
            console.error('Категория поставщиков не найдена');
        } else {
            categoryId = categories[0].id;

            const resultItem = await $b24.actions.v2.call.make({
                method: 'crm.item.add',
                params: {
                    entityTypeId: entityTypeId,
                    fields: {
                        name: 'Иван',
                        lastName: 'Иванов',
                        categoryId: categoryId,
                        fm: [
                            { typeId: 'PHONE', valueType: 'WORK', value: '+7 900 000 00 00' },
                            { typeId: 'PHONE', valueType: 'MOBILE', value: '+7 495 111 22 33' },
                            { typeId: 'EMAIL', valueType: 'WORK', value: 'supplier@example.ru' }
                        ],
                        comments: 'Поставщик электроники'
                    }
                }
            });

            if (!resultItem.isSuccess) {
                console.error(resultItem.getErrorMessages().join('; '));
            } else {
                console.log(resultItem.getData().result);
            }
        }
    }
    ```

- PHP
  
    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $entityTypeId = 3; // 3 - контакт; для компании укажите 4
    $categoryCode = 'CATALOG_CONTRACTOR_CONTACT'; // для компании укажите CATALOG_CONTRACTOR_COMPANY

    try {
        $resultCategory = $serviceBuilder->core->call(
            'crm.category.list',
            [
                'entityTypeId' => $entityTypeId,
                'filter' => [
                    'code' => $categoryCode
                ]
            ]
        );

        $categories = $resultCategory->getResponseData()->getResult()['categories'] ?? [];
        if (empty($categories)) {
            echo 'Категория поставщиков не найдена';
            return;
        }

        $categoryId = $categories[0]['id'];

        $resultItem = $serviceBuilder->getCRMScope()->item()->add(
            $entityTypeId,
            [
                'name' => 'Иван',
                'lastName' => 'Иванов',
                'categoryId' => $categoryId,
                'fm' => [
                    [ 'typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => '+7 900 000 00 00' ],
                    [ 'typeId' => 'PHONE', 'valueType' => 'MOBILE', 'value' => '+7 495 111 22 33' ],
                    [ 'typeId' => 'EMAIL', 'valueType' => 'WORK', 'value' => 'supplier@example.ru' ]
                ],
                'comments' => 'Поставщик электроники'
            ]
        );

        print_r($resultItem->item());
    } catch (\Throwable $e) {
        echo $e->getMessage();
    }
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError


    client = Client(BitrixWebhook(domain="your-domain.bitrix24.com", webhook_token="user_id/webhook_key"))

    entity_type_id = 3  # 3 - контакт; для компании используйте 4
    category_code = "CATALOG_CONTRACTOR_CONTACT"  # для компании используйте CATALOG_CONTRACTOR_COMPANY

    try:
        category_response = client.crm.category.list(
            entity_type_id=entity_type_id,
        ).response
    except BitrixAPIError as error:
        print(error)
    else:
        categories = [
            category
            for category in category_response.result.get("categories", [])
            if category.get("code") == category_code
        ]
        if not categories:
            print("Категория поставщиков не найдена")
        else:
            category_id = categories[0]["id"]

            try:
                item_response = client.crm.item.add(
                    entity_type_id=entity_type_id,
                    fields={
                        "name": "Иван",
                        "lastName": "Иванов",
                        "categoryId": category_id,
                        "fm": [
                            {"typeId": "PHONE", "valueType": "WORK", "value": "+7 900 000 00 00"},
                            {"typeId": "PHONE", "valueType": "MOBILE", "value": "+7 495 111 22 33"},
                            {"typeId": "EMAIL", "valueType": "WORK", "value": "supplier@example.ru"},
                        ],
                        "comments": "Поставщик электроники",
                    },
                ).response
            except BitrixAPIError as error:
                print(error)
            else:
                print(item_response.result)
    ```

{% endlist %}
