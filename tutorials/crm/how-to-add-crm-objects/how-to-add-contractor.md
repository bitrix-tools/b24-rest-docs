# Как создать поставщика в CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны оба права — на добавление и на чтение элементов объекта CRM
>
> - [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) — пользователь с правом на добавление элементов объекта CRM
> - [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) — пользователь с правом на чтение элементов объекта CRM
> - [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Поставщик в Битрикс24 — это контакт или компания CRM из системной воронки с особым кодом:

- `CATALOG_CONTRACTOR_CONTACT` — для контакта

- `CATALOG_CONTRACTOR_COMPANY` — для компании

Отдельного метода для создания поставщика нет. Поставщиком становится контакт или компания с идентификатором системной воронки в поле `categoryId`. Записать этот идентификатор в код константой нельзя, поэтому сначала запросим его по коду воронки, а потом создадим объект.

В результате сценария в CRM появится контакт в воронке поставщиков, а метод вернет его `id`. Этот идентификатор нужен методам складского учета. Например, метод [catalog.documentcontractor.add](../../../api-reference/catalog/documentcontractor/catalog-documentcontractor-add.md) привязывает поставщика к складскому документу.

Сценарий состоит из двух шагов.

1. Получить `id` системной воронки поставщиков методом [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md)
2. Создать контакт или компанию методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md), передав этот `id` в поле `categoryId`

## Что нужно до начала

- вебхук создан от имени пользователя, у которого есть право добавлять контакты и компании в CRM

- в правах вебхука отмечен scope `crm`

- в Битрикс24 включен складской учет: системные воронки поставщиков создаются вместе с ним

- у пользователя вебхука есть доступ к воронке поставщиков: шаг 1 возвращает только видимые ему воронки, а шаг 2 проверяет право добавлять элементы именно в эту воронку

- путь вебхука дает полный доступ в рамках своего scope. Храните путь в переменной окружения и не публикуйте его в открытом коде

- вы решили, кого создаете: контакта или компанию. От этого зависят `entityTypeId`, код системной воронки и поля названия

Значения для контакта и компании различаются — выберите столбец для своего объекта.

#|
|| **Что передаем** | **Контакт** | **Компания** ||
|| `entityTypeId` | `3` | `4` ||
|| Код системной воронки | `CATALOG_CONTRACTOR_CONTACT` | `CATALOG_CONTRACTOR_COMPANY` ||
|| Поля названия | `name` и `lastName` | `title` ||
|#

Дальше в примерах создается контакт. Что заменить для компании, описано в блоке [Что важно учитывать](#company).

## 1. Получим идентификатор воронки поставщиков {#category-id}

Используем метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с параметрами:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type), обязательный параметр. Укажем `3` — контакт

- `filter[code]` — фильтр по коду воронки. Укажем `CATALOG_CONTRACTOR_CONTACT`. Без фильтра метод вернет все воронки контактов, включая общую

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const resultCategory = await $b24.actions.v2.call.make({
        method: 'crm.category.list',
        params: {
            entityTypeId: 3, // 3 — контакт
            filter: {
                code: 'CATALOG_CONTRACTOR_CONTACT' // Код системной воронки поставщиков
            }
        },
        requestId: 'category-list'
    });

    const categories = resultCategory.getData().result.categories;
    const categoryId = categories.length ? categories[0].id : null;
    ```

- PHP

    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    // у crm.category.list нет обертки в SDK — вызываем метод напрямую
    $result = $sb->core->call(
        'crm.category.list',
        [
            'entityTypeId' => 3, // 3 — контакт
            'filter' => [
                'code' => 'CATALOG_CONTRACTOR_CONTACT' // Код системной воронки поставщиков
            ]
        ]
    );

    $categories = $result->getResponseData()->getResult()['categories'] ?? [];
    $categoryId = $categories[0]['id'] ?? null;
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    # обертка b24pysdk принимает только entity_type_id, поэтому отбираем воронку по коду в ответе
    categories = client.crm.category.list(
        entity_type_id=3,  # 3 — контакт
    ).response.result["categories"]

    contractor_categories = [
        category
        for category in categories
        if category["code"] == "CATALOG_CONTRACTOR_CONTACT"
    ]
    category_id = contractor_categories[0]["id"] if contractor_categories else None
    ```

{% endlist %}

В ответе метод вернет массив `categories`. Сохраните `id` первого элемента — его нужно передать в шаг 2. В примере `id`: `15`.

```json
{
    "result": {
        "categories": [
            {
                "id": 15,
                "name": "Контакты поставщика",
                "sort": 500,
                "entityTypeId": 3,
                "isDefault": "N",
                "isSystem": "Y",
                "code": "CATALOG_CONTRACTOR_CONTACT"
            }
        ]
    },
    "total": 1
}
```

Признак `isSystem`: `Y` подтверждает, что воронка создана системой, а не пользователем.

{% note warning "" %}

До вызова шага 2 проверьте, что массив `categories` не пустой. Если вызвать метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) без `categoryId`, ошибки не будет: контакт создастся в общей воронке, но в списке поставщиков его не появится.

{% endnote %}

## 2. Создадим поставщика

Используем метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) с параметрами:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type), обязательный параметр. Укажем `3` — контакт

- `fields[categoryId]` — идентификатор воронки из шага [crm.category.list](#category-id), в примере `15`. Именно это поле делает контакт поставщиком

- `fields[name]` и `fields[lastName]` — имя и фамилия контакта

- `fields[fm]` — массив мультиполей [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield) для телефонов и почты

- `fields[comments]` — комментарий в карточке

Телефон и почту Битрикс24 хранит не отдельными полями, а мультиполями. Каждый элемент массива `fm` содержит:

- `typeId` — тип мультиполя, `PHONE` или `EMAIL`

- `valueType` — тип значения, например `WORK` или `MOBILE`

- `value` — само значение

{% list tabs %}

- JS

    ```javascript
    const resultItem = await $b24.actions.v2.call.make({
        method: 'crm.item.add',
        params: {
            entityTypeId: 3, // 3 — контакт
            fields: {
                name: 'Иван', // Имя
                lastName: 'Иванов', // Фамилия
                categoryId: categoryId, // Идентификатор воронки из шага 1
                fm: [ // Телефоны и почта
                    { typeId: 'PHONE', valueType: 'WORK', value: '+7 900 000 00 00' },
                    { typeId: 'PHONE', valueType: 'MOBILE', value: '+7 495 111 22 33' },
                    { typeId: 'EMAIL', valueType: 'WORK', value: 'supplier@example.ru' }
                ],
                comments: 'Поставщик электроники' // Комментарий
            }
        },
        requestId: 'item-add'
    });

    const contractorId = resultItem.getData().result.item.id;
    ```

- PHP

    ```php
    $result = $sb->getCRMScope()->item()->add(
        3, // 3 — контакт
        [
            'name' => 'Иван', // Имя
            'lastName' => 'Иванов', // Фамилия
            'categoryId' => $categoryId, // Идентификатор воронки из шага 1
            'fm' => [ // Телефоны и почта
                [ 'typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => '+7 900 000 00 00' ],
                [ 'typeId' => 'PHONE', 'valueType' => 'MOBILE', 'value' => '+7 495 111 22 33' ],
                [ 'typeId' => 'EMAIL', 'valueType' => 'WORK', 'value' => 'supplier@example.ru' ]
            ],
            'comments' => 'Поставщик электроники' // Комментарий
        ]
    );

    $contractorId = $result->item()->id;
    ```

- Python

    ```python
    item = client.crm.item.add(
        entity_type_id=3,  # 3 — контакт
        fields={
            "name": "Иван",  # Имя
            "lastName": "Иванов",  # Фамилия
            "categoryId": category_id,  # Идентификатор воронки из шага 1
            "fm": [  # Телефоны и почта
                {"typeId": "PHONE", "valueType": "WORK", "value": "+7 900 000 00 00"},
                {"typeId": "PHONE", "valueType": "MOBILE", "value": "+7 495 111 22 33"},
                {"typeId": "EMAIL", "valueType": "WORK", "value": "supplier@example.ru"},
            ],
            "comments": "Поставщик электроники",  # Комментарий
        },
    ).response.result["item"]

    contractor_id = item["id"]
    ```

{% endlist %}

В ответе метод вернет объект `item` с полным набором полей контакта. Ответ сокращен, показаны поля, которые подтверждают результат.

```json
{
    "result": {
        "item": {
            "id": 2643,
            "entityTypeId": 3,
            "categoryId": 15,
            "name": "Иван",
            "lastName": "Иванов",
            "comments": "Поставщик электроники",
            "hasPhone": "Y",
            "hasEmail": "Y",
            "createdTime": "2026-08-19T14:56:05+03:00",
            "createdBy": 1,
            "assignedById": 1,
            "fm": [
                {
                    "id": 8533,
                    "valueType": "WORK",
                    "value": "+7 900 000 00 00",
                    "typeId": "PHONE"
                },
                {
                    "id": 8535,
                    "valueType": "MOBILE",
                    "value": "+7 495 111 22 33",
                    "typeId": "PHONE"
                },
                {
                    "id": 8537,
                    "valueType": "WORK",
                    "value": "supplier@example.ru",
                    "typeId": "EMAIL"
                }
            ]
        }
    }
}
```

Сохраните `id`. В примере `id`: `2643`.

## Проверим результат

Откройте список контактов в CRM и переключитесь на воронку «Контакты поставщика» — ее название пришло в поле `name` на шаге 1. Новый контакт «Иван Иванов» появится в этой воронке с телефонами и почтой из запроса. В общей воронке контактов его не будет.

Через REST поставщиков возвращает метод [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) с параметрами:

- `entityTypeId` — `3` для контактов

- `filter[categoryId]` — идентификатор воронки из шага 1, в примере `15`

- `filter[id]` — идентификатор поставщика из шага 2, в примере `2643`. Без него метод вернет первую страницу списка поставщиков: если поставщиков много, нового элемента в ней может не оказаться

{% list tabs %}

- JS

    ```javascript
    const checkResult = await $b24.actions.v2.call.make({
        method: 'crm.item.list',
        params: {
            entityTypeId: 3,
            filter: { categoryId: categoryId, id: contractorId },
            select: ['id', 'name', 'lastName', 'categoryId']
        },
        requestId: 'item-list'
    });

    console.dir(checkResult.getData().result.items);
    ```

- PHP

    ```php
    $checkResult = $sb->getCRMScope()->item()->list(
        3,
        [],
        ['categoryId' => $categoryId, 'id' => $contractorId],
        ['id', 'name', 'lastName', 'categoryId']
    );

    print_r($checkResult->getItems());
    ```

- Python

    ```python
    check_result = client.crm.item.list(
        3,
        filter={"categoryId": category_id, "id": contractor_id},
        select=["id", "name", "lastName", "categoryId"],
    ).response.result["items"]

    print(check_result)
    ```

{% endlist %}

Сценарий выполнен, если в массиве `items` есть элемент с `id` из шага 2, а его `categoryId` совпадает с идентификатором системной воронки.

```json
{
    "result": {
        "items": [
            {
                "id": 2643,
                "name": "Иван",
                "lastName": "Иванов",
                "categoryId": 15
            }
        ]
    }
}
```

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `ACCESS_DENIED` | У пользователя вебхука нет права добавлять элементы объекта с этим `entityTypeId`. Проверьте, от чьего имени создан вебхук ||
|| `allowed_only_intranet_user` | Вебхук создан от имени внешнего пользователя. Сценарий доступен только сотрудникам Битрикс24 ||
|| `NOT_FOUND` | В `entityTypeId` передано значение, которому не соответствует ни один объект CRM. Для контакта нужно `3`, для компании — `4` ||
|| `CRM_FIELD_ERROR_VALUE_NOT_VALID` | Неверное значение поля. Две частые причины: недопустимый `typeId` или `valueType` в мультиполе `fm`, либо `categoryId` от чужого типа объекта. Текст `Неверное значение поля "Категория"` означает, что `entityTypeId` и код воронки не согласованы: например, `entityTypeId`: `4` с воронкой контактов ||
|| `100` | В множественное поле передан не массив. Проверьте, что `fm` передан массивом, даже если телефон один ||
|#

Поля, которых нет у объекта, метод не считает ошибкой — он их отбрасывает. При неверном наборе полей метод не откажет, а контакт или компания создадутся неполными.

Пустой массив `categories` в шаге 1 — не ошибка метода. Причин две: в Битрикс24 не включен складской учет, поэтому системных воронок поставщиков нет, либо у пользователя вебхука нет доступа к этой воронке — метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) возвращает только те воронки, которые пользователю разрешено читать.

Чтобы различить причины, выполните шаг 1 вебхуком администратора. Если администратор воронку видит, а исходный вебхук нет, дело в правах его пользователя. Если не видит и администратор, складской учет не включен.

Шаг 1 ничего не создает, его можно повторять сколько угодно раз. Если ошибку вернул шаг 2, поставщик не создан: исправьте `fields` и повторите только этот шаг.

## Что важно учитывать {#company}

- чтобы создать поставщика-компанию, замените `entityTypeId` на `4`, код воронки на `CATALOG_CONTRACTOR_COMPANY`, а поля `name` и `lastName` — на `title`. Менять `entityTypeId` и код воронки нужно вместе, иначе метод вернет ошибку `CRM_FIELD_ERROR_VALUE_NOT_VALID`

- если при переходе на компанию оставить поля контакта, компания все равно создастся, но с автоматическим названием вида «Компания #3009». Подставьте `title` самостоятельно

- воронку поставщиков нельзя создать самостоятельно: метод [crm.category.add](../../../api-reference/crm/universal/category/crm-category-add.md) запрещает добавление системных воронок

- метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) не проверяет дубликаты. Повторный запуск примера создаст второго поставщика с теми же данными. Перед созданием ищите поставщика методом [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md) по телефону или почте

- идентификатор воронки различается на разных Битрикс24. Не переносите значение `15` из примера в рабочий код, запрашивайте его шагом 1

## Пример кода

Скрипт получает идентификатор системной воронки поставщиков и создает в ней контакт. Значения `entityTypeId`, кода воронки и полей вынесены в переменные — для компании достаточно поменять их в одном месте.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const entityTypeId = 3; // 3 — контакт, для компании укажите 4
    const categoryCode = 'CATALOG_CONTRACTOR_CONTACT'; // для компании укажите CATALOG_CONTRACTOR_COMPANY
    const nameFields = { name: 'Иван', lastName: 'Иванов' }; // для компании укажите { title: 'ООО Электроника' }

    async function createContractor() {
        try {
            const resultCategory = await $b24.actions.v2.call.make({
                method: 'crm.category.list',
                params: {
                    entityTypeId: entityTypeId,
                    filter: { code: categoryCode }
                },
                requestId: 'category-list'
            });

            const categories = resultCategory.getData().result.categories;
            if (!categories.length) {
                console.error('Воронка поставщиков не найдена: проверьте складской учет и доступ пользователя вебхука');
                return;
            }
            const categoryId = categories[0].id;

            const resultItem = await $b24.actions.v2.call.make({
                method: 'crm.item.add',
                params: {
                    entityTypeId: entityTypeId,
                    fields: {
                        ...nameFields,
                        categoryId: categoryId,
                        fm: [
                            { typeId: 'PHONE', valueType: 'WORK', value: '+7 900 000 00 00' },
                            { typeId: 'PHONE', valueType: 'MOBILE', value: '+7 495 111 22 33' },
                            { typeId: 'EMAIL', valueType: 'WORK', value: 'supplier@example.ru' }
                        ],
                        comments: 'Поставщик электроники'
                    }
                },
                requestId: 'item-add'
            });

            console.log('Поставщик создан, id:', resultItem.getData().result.item.id);
        } catch (error) {
            console.error('Поставщик не создан:', error.message);
        }
    }

    createContractor();
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $entityTypeId = 3; // 3 — контакт, для компании укажите 4
    $categoryCode = 'CATALOG_CONTRACTOR_CONTACT'; // для компании укажите CATALOG_CONTRACTOR_COMPANY
    $nameFields = ['name' => 'Иван', 'lastName' => 'Иванов']; // для компании укажите ['title' => 'ООО Электроника']

    try {
        // у crm.category.list нет обертки в SDK — вызываем метод напрямую
        $resultCategory = $sb->core->call(
            'crm.category.list',
            [
                'entityTypeId' => $entityTypeId,
                'filter' => ['code' => $categoryCode]
            ]
        );

        $categories = $resultCategory->getResponseData()->getResult()['categories'] ?? [];
        if (empty($categories)) {
            echo 'Воронка поставщиков не найдена: проверьте складской учет и доступ пользователя вебхука';
            return;
        }
        $categoryId = $categories[0]['id'];

        $resultItem = $sb->getCRMScope()->item()->add(
            $entityTypeId,
            array_merge(
                $nameFields,
                [
                    'categoryId' => $categoryId,
                    'fm' => [
                        [ 'typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => '+7 900 000 00 00' ],
                        [ 'typeId' => 'PHONE', 'valueType' => 'MOBILE', 'value' => '+7 495 111 22 33' ],
                        [ 'typeId' => 'EMAIL', 'valueType' => 'WORK', 'value' => 'supplier@example.ru' ]
                    ],
                    'comments' => 'Поставщик электроники'
                ]
            )
        );

        echo 'Поставщик создан, id: ' . $resultItem->item()->id;
    } catch (\Throwable $e) {
        echo 'Поставщик не создан: ' . $e->getMessage();
    }
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    entity_type_id = 3  # 3 — контакт, для компании укажите 4
    category_code = "CATALOG_CONTRACTOR_CONTACT"  # для компании укажите CATALOG_CONTRACTOR_COMPANY
    name_fields = {"name": "Иван", "lastName": "Иванов"}  # для компании укажите {"title": "ООО Электроника"}

    try:
        # обертка b24pysdk принимает только entity_type_id, поэтому отбираем воронку по коду в ответе
        categories = client.crm.category.list(
            entity_type_id=entity_type_id,
        ).response.result["categories"]

        contractor_categories = [
            category
            for category in categories
            if category["code"] == category_code
        ]
        if not contractor_categories:
            print("Воронка поставщиков не найдена: проверьте складской учет и доступ пользователя вебхука")
        else:
            item = client.crm.item.add(
                entity_type_id,
                {
                    **name_fields,
                    "categoryId": contractor_categories[0]["id"],
                    "fm": [
                        {"typeId": "PHONE", "valueType": "WORK", "value": "+7 900 000 00 00"},
                        {"typeId": "PHONE", "valueType": "MOBILE", "value": "+7 495 111 22 33"},
                        {"typeId": "EMAIL", "valueType": "WORK", "value": "supplier@example.ru"},
                    ],
                    "comments": "Поставщик электроники",
                },
            ).response.result["item"]

            print(f"Поставщик создан, id: {item['id']}")
    except BitrixAPIError as error:
        print(f"Поставщик не создан: {error}")
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](../how-to-get-lists/how-to-get-contractors.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-add.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-list.md)
- [{#T}](../../../api-reference/crm/universal/category/crm-category-list.md)
- [{#T}](../../../api-reference/crm/data-types.md)
- [{#T}](../../../api-reference/catalog/documentcontractor/catalog-documentcontractor-add.md)
- [{#T}](../../../api-reference/catalog/documentcontractor/catalog-documentcontractor-list.md)
