# Как добавить действие для создания смарт-счета на основании лида или сделки

> Scope: [`bizproc`, `crm`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужен администратор Битрикс24 с правами на чтение лида или сделки, создание смарт-счета и изменение его товарных позиций
>
> - [bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md) и [bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md) — администратор
> - [crm.item.get](../../api-reference/crm/universal/crm-item-get.md) — пользователь с правом чтения элементов объекта CRM
> - [crm.item.add](../../api-reference/crm/universal/crm-item-add.md) — пользователь с правом добавления элементов объекта CRM
> - [crm.item.productrow.list](../../api-reference/crm/universal/product-rows/crm-item-productrow-list.md) — пользователь с правом чтения объекта CRM, товарные позиции которого выбираются
> - [crm.item.productrow.set](../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md) — пользователь с правом изменения объекта CRM, товарные позиции которого устанавливаются

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Сценарий показывает, как приложение добавляет действие бизнес-процесса, которое получает лид или сделку из контекста запуска и создает смарт-счет по данным CRM-объекта. Из лида или сделки в счет передаются клиент и товарные позиции. Для сделки счет дополнительно связывается с исходной сделкой через поле `parentId2`.

Действие можно использовать в дизайнере бизнес-процессов. Для CRM-автоматизации используйте робота приложения: набор параметров и обработчик останутся такими же, изменится только метод регистрации.

Сценарий состоит из четырех шагов.

1. Зарегистрируйте действие методом [bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md)
2. Получите в обработчике `document_id` и определите, что запустило действие: лид или сделка
3. Получите данные CRM-объекта методом [crm.item.get](../../api-reference/crm/universal/crm-item-get.md) и товарные позиции методом [crm.item.productrow.list](../../api-reference/crm/universal/product-rows/crm-item-productrow-list.md)
4. Создайте смарт-счет методом [crm.item.add](../../api-reference/crm/universal/crm-item-add.md) и перенесите товары методом [crm.item.productrow.set](../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md)

## Подготовьте приложение

Методы `bizproc.activity.add` и `bizproc.robot.add` работают только в контексте [приложения](../../settings/app-installation/index.md). Входящий вебхук не подойдет: метод вернет ошибку `ACCESS_DENIED` с описанием `Application context required`.

Перед началом подготовьте:

- установленное приложение со scope `bizproc` и `crm`
- публичный HTTPS-адрес обработчика, например `https://your-domain.example/bp-handler`
- идентификатор администратора для параметра `AUTH_USER_ID`
- идентификатор вашей компании для поля смарт-счета `mycompanyId`

Авторизацию приложения обработчик получает в запросе от Битрикс24. Значения `auth[domain]`, `auth[access_token]` и `auth[refresh_token]` используйте для вызовов CRM-методов из обработчика.

В сценарии используются идентификаторы типов CRM:

#|
|| Объект | `entityTypeId` | `ownerType` ||
|| Лид | `1` | `L` ||
|| Сделка | `2` | `D` ||
|| Смарт-счет | `31` | `SI` ||
|#

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Инициализируйте SDK в обработчике

Обработчик получает авторизацию в запросе от Битрикс24. Используйте `auth`, чтобы создать клиент SDK для вызовов CRM-методов.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24OAuth } from '@bitrix24/b24jssdk'

    const APP = { clientId: 'local.xxxxxxxx.xxxxxxxx', clientSecret: 'yyyyyyyy' }

    function makeClient(auth) {
        const $b24 = new B24OAuth({
            domain: auth.domain,
            accessToken: auth.access_token,
            refreshToken: auth.refresh_token,
            memberId: auth.member_id,
        }, APP)
        $b24.offClientSideWarning()
        return $b24
    }

    const $b24 = makeClient(req.body.auth)
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Credentials\ApplicationProfile;
    use Bitrix24\SDK\Core\Credentials\AuthToken;
    use Bitrix24\SDK\Core\Credentials\DefaultOAuthServerUrl;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Monolog\Handler\StreamHandler;
    use Monolog\Logger;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Symfony\Component\HttpFoundation\Request;

    $request = Request::createFromGlobals();
    $appProfile = ApplicationProfile::initFromArray([
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => 'local.xxxxxxxx.xxxxxxxx',
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => 'yyyyyyyy',
        'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'bizproc,crm',
    ]);

    $authToken = AuthToken::initFromEventRequest($request);
    $domain = (string)$request->request->all('auth')['domain'];

    $log = new Logger('bizproc');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->init($appProfile, $authToken, $domain, DefaultOAuthServerUrl::default());
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import BitrixApp, BitrixToken, Client

    APP = BitrixApp(client_id="local.xxxxxxxx.xxxxxxxx", client_secret="yyyyyyyy")

    def make_client(auth: dict) -> tuple[Client, BitrixToken]:
        token = BitrixToken(
            domain=auth["domain"],
            auth_token=auth["access_token"],
            refresh_token=auth.get("refresh_token", ""),
            bitrix_app=APP,
        )
        return Client(token), token

    auth = request.json["auth"]  # словарь auth из тела запроса обработчика
    client, token = make_client(auth)
    ```

{% endlist %}

## 1. Зарегистрируйте действие

Передайте в `CODE` уникальный код действия в рамках приложения. В `HANDLER` укажите публичный URL, на который Битрикс24 отправит данные при выполнении действия. В `PROPERTIES` опишите параметры, которые администратор заполнит в дизайнере бизнес-процесса.

В примере действие получает два параметра:

- `invoice_title` — название смарт-счета
- `mycompany_id` — идентификатор вашей компании

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()

    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.activity.add',
        params: {
            CODE: 'create_smart_invoice',
            HANDLER: 'https://your-domain.example/bp-handler',
            AUTH_USER_ID: 1,
            NAME: 'Создать смарт-счет',
            DESCRIPTION: 'Создает смарт-счет по данным лида или сделки',
            PROPERTIES: {
                invoice_title: {
                    Name: 'Название счета',
                    Type: 'string',
                    Required: 'Y',
                    Default: 'Счет по документу CRM',
                },
                mycompany_id: {
                    Name: 'Идентификатор вашей компании',
                    Type: 'int',
                    Required: 'Y',
                    Default: '1',
                },
            },
            FILTER: {
                INCLUDE: [
                    ['crm', 'CCrmDocumentDeal'],
                    ['crm', 'CCrmDocumentLead'],
                ],
            },
        },
        requestId: 'bizproc-activity-add',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    console.info(response.getData().result) // true
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    // $b24 построен на токене установленного приложения.
    // Типизированный метод activity()->add принимает расширенные DTO,
    // поэтому для короткого примера используем прямой вызов через ядро SDK.
    $response = $b24->core->call('bizproc.activity.add', [
        'CODE' => 'create_smart_invoice',
        'HANDLER' => 'https://your-domain.example/bp-handler',
        'AUTH_USER_ID' => 1,
        'NAME' => 'Создать смарт-счет',
        'DESCRIPTION' => 'Создает смарт-счет по данным лида или сделки',
        'PROPERTIES' => [
            'invoice_title' => [
                'Name' => 'Название счета',
                'Type' => 'string',
                'Required' => 'Y',
                'Default' => 'Счет по документу CRM',
            ],
            'mycompany_id' => [
                'Name' => 'Идентификатор вашей компании',
                'Type' => 'int',
                'Required' => 'Y',
                'Default' => '1',
            ],
        ],
        'FILTER' => [
            'INCLUDE' => [
                ['crm', 'CCrmDocumentDeal'],
                ['crm', 'CCrmDocumentLead'],
            ],
        ],
    ]);

    print_r($response->getResponseData()->getResult()); // true
    ```

- Python

    ```python
    # pip install b24pysdk

    # client построен на токене установленного приложения.
    result = client.bizproc.activity.add(
        code="create_smart_invoice",
        handler="https://your-domain.example/bp-handler",
        auth_user_id=1,
        name="Создать смарт-счет",
        description="Создает смарт-счет по данным лида или сделки",
        properties={
            "invoice_title": {
                "Name": "Название счета",
                "Type": "string",
                "Required": "Y",
                "Default": "Счет по документу CRM",
            },
            "mycompany_id": {
                "Name": "Идентификатор вашей компании",
                "Type": "int",
                "Required": "Y",
                "Default": "1",
            },
        },
        filter={
            "INCLUDE": [
                ["crm", "CCrmDocumentDeal"],
                ["crm", "CCrmDocumentLead"],
            ],
        },
    ).response.result

    print(result)  # True
    ```

{% endlist %}

Если нужно добавить робота для CRM-автоматизации, замените метод `bizproc.activity.add` на [bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md). Параметры `CODE`, `HANDLER`, `AUTH_USER_ID`, `NAME`, `DESCRIPTION`, `PROPERTIES` и `FILTER` используются так же.

Пример успешного ответа:

```json
{
    "result": true
}
```

После регистрации действие появится в дизайнере бизнес-процессов для лидов и сделок. Когда бизнес-процесс дойдет до этого действия, Битрикс24 вызовет `HANDLER`.

## 2. Разберите данные обработчика

В обработчик Битрикс24 передает параметры действия в `properties` и идентификаторы документа в `document_id`. Для лида значение содержит строку вида `LEAD_456`, для сделки — `DEAL_123`.

Из `document_id` сохраните:

- `entityTypeId` исходного CRM-объекта: `1` для лида или `2` для сделки
- `ownerType` исходного CRM-объекта: `L` для лида или `D` для сделки
- числовой идентификатор исходного CRM-объекта

{% list tabs %}

- JS

    ```js
    function parseDocumentId(documentId) {
        const values = Array.isArray(documentId) ? documentId : [documentId]
        const deal = values.find((value) => String(value).startsWith('DEAL_'))
        const lead = values.find((value) => String(value).startsWith('LEAD_'))

        if (deal) {
            return { entityTypeId: 2, ownerType: 'D', id: Number(deal.slice(5)) }
        }

        if (lead) {
            return { entityTypeId: 1, ownerType: 'L', id: Number(lead.slice(5)) }
        }

        throw new Error('Действие запущено не из лида и не из сделки')
    }

    const source = parseDocumentId(req.body.document_id)
    const properties = req.body.properties || {}
    ```

- PHP

    ```php
    <?php
    function parseDocumentId(array $documentId): array
    {
        foreach ($documentId as $value) {
            if (str_starts_with((string)$value, 'DEAL_')) {
                return ['entityTypeId' => 2, 'ownerType' => 'D', 'id' => (int)substr((string)$value, 5)];
            }

            if (str_starts_with((string)$value, 'LEAD_')) {
                return ['entityTypeId' => 1, 'ownerType' => 'L', 'id' => (int)substr((string)$value, 5)];
            }
        }

        throw new RuntimeException('Действие запущено не из лида и не из сделки');
    }

    $source = parseDocumentId((array)($_REQUEST['document_id'] ?? []));
    $properties = $_REQUEST['properties'] ?? [];
    ```

- Python

    ```python
    def parse_document_id(document_id: list[str]) -> dict:
        for value in document_id:
            if value.startswith("DEAL_"):
                return {"entityTypeId": 2, "ownerType": "D", "id": int(value[5:])}

            if value.startswith("LEAD_"):
                return {"entityTypeId": 1, "ownerType": "L", "id": int(value[5:])}

        raise ValueError("Действие запущено не из лида и не из сделки")

    payload = request.json
    source = parse_document_id(payload.get("document_id", []))
    properties = payload.get("properties", {})
    ```

{% endlist %}

## 3. Получите CRM-объект и товары

Вызовите [crm.item.get](../../api-reference/crm/universal/crm-item-get.md), чтобы получить поля исходного лида или сделки. В параметр `entityTypeId` передайте значение, полученное при разборе `document_id`, в `id` — числовой идентификатор объекта.

Товарные позиции получите методом [crm.item.productrow.list](../../api-reference/crm/universal/product-rows/crm-item-productrow-list.md). В фильтр передайте `=ownerType` и `=ownerId` исходного CRM-объекта.

{% list tabs %}

- JS

    ```js
    async function callMethod($b24, method, params) {
        const response = await $b24.actions.v2.call.make({
            method,
            params,
            requestId: method,
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    const sourceItemResult = await callMethod($b24, 'crm.item.get', {
        entityTypeId: source.entityTypeId,
        id: source.id,
    })
    const sourceItem = sourceItemResult.item

    const sourceRowsResult = await callMethod($b24, 'crm.item.productrow.list', {
        filter: {
            '=ownerType': source.ownerType,
            '=ownerId': source.id,
        },
    })
    const sourceRows = sourceRowsResult.productRows
    ```

- PHP

    ```php
    <?php
    $sourceItem = $b24->core
        ->call('crm.item.get', [
            'entityTypeId' => $source['entityTypeId'],
            'id' => $source['id'],
        ])
        ->getResponseData()
        ->getResult()['item'];

    $sourceRows = $b24->core
        ->call('crm.item.productrow.list', [
            'filter' => [
                '=ownerType' => $source['ownerType'],
                '=ownerId' => $source['id'],
            ],
        ])
        ->getResponseData()
        ->getResult()['productRows'];
    ```

- Python

    ```python
    source_item = token.call_method("crm.item.get", {
        "entityTypeId": source["entityTypeId"],
        "id": source["id"],
    })["result"]["item"]

    source_rows = token.call_method("crm.item.productrow.list", {
        "filter": {
            "=ownerType": source["ownerType"],
            "=ownerId": source["id"],
        },
    })["result"]["productRows"]
    ```

{% endlist %}

В ответе `crm.item.get` сохраните `item.companyId`, `item.contactId` или `item.contactIds`. Эти поля нужны для клиента смарт-счета. В ответе `crm.item.productrow.list` сохраните массив `productRows`: его нужно подготовить и передать в смарт-счет.

## 4. Создайте смарт-счет и перенесите товары

Создайте смарт-счет методом [crm.item.add](../../api-reference/crm/universal/crm-item-add.md). В параметр `entityTypeId` передайте `31`.

В `fields` передайте:

- `title` — название смарт-счета из параметра действия `invoice_title`
- `companyId` — идентификатор компании из исходного CRM-объекта
- `contactId` — идентификатор контакта из исходного CRM-объекта
- `contactIds` — массив идентификаторов контактов из исходного CRM-объекта, если он есть
- `mycompanyId` — идентификатор вашей компании из параметра действия `mycompany_id`
- `parentId2` — идентификатор сделки, если действие запущено из сделки

Затем передайте товарные позиции в созданный смарт-счет методом [crm.item.productrow.set](../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md). В `ownerType` укажите `SI`, в `ownerId` — идентификатор смарт-счета из ответа `crm.item.add`.

{% list tabs %}

- JS

    ```js
    function prepareProductRows(rows) {
        return rows.map((row, index) => ({
            productId: row.productId,
            productName: row.productName,
            price: row.price,
            quantity: row.quantity,
            discountTypeId: row.discountTypeId,
            discountRate: row.discountRate,
            discountSum: row.discountSum,
            taxRate: row.taxRate,
            taxIncluded: row.taxIncluded,
            measureCode: row.measureCode,
            sort: row.sort || (index + 1) * 10,
        }))
    }

    const fields = {
        title: properties.invoice_title || 'Счет по документу CRM',
        companyId: sourceItem.companyId || 0,
        contactId: sourceItem.contactId || 0,
        contactIds: sourceItem.contactIds || [],
        mycompanyId: Number(properties.mycompany_id),
    }

    if (source.entityTypeId === 2) {
        fields.parentId2 = source.id
    }

    const invoiceResult = await callMethod($b24, 'crm.item.add', {
        entityTypeId: 31,
        fields,
    })
    const invoiceId = invoiceResult.item.id

    if (sourceRows.length > 0) {
        await callMethod($b24, 'crm.item.productrow.set', {
            ownerType: 'SI',
            ownerId: invoiceId,
            productRows: prepareProductRows(sourceRows),
        })
    }

    console.info(`Создан смарт-счет ${invoiceId}`)
    ```

- PHP

    ```php
    <?php
    function prepareProductRows(array $rows): array
    {
        $preparedRows = [];

        foreach (array_values($rows) as $index => $row) {
            $preparedRows[] = [
                'productId' => $row['productId'] ?? null,
                'productName' => $row['productName'] ?? null,
                'price' => $row['price'] ?? null,
                'quantity' => $row['quantity'] ?? 1,
                'discountTypeId' => $row['discountTypeId'] ?? null,
                'discountRate' => $row['discountRate'] ?? null,
                'discountSum' => $row['discountSum'] ?? null,
                'taxRate' => $row['taxRate'] ?? null,
                'taxIncluded' => $row['taxIncluded'] ?? null,
                'measureCode' => $row['measureCode'] ?? null,
                'sort' => $row['sort'] ?? (($index + 1) * 10),
            ];
        }

        return $preparedRows;
    }

    $fields = [
        'title' => $properties['invoice_title'] ?? 'Счет по документу CRM',
        'companyId' => (int)($sourceItem['companyId'] ?? 0),
        'contactId' => (int)($sourceItem['contactId'] ?? 0),
        'contactIds' => $sourceItem['contactIds'] ?? [],
        'mycompanyId' => (int)($properties['mycompany_id'] ?? 0),
    ];

    if ($source['entityTypeId'] === 2) {
        $fields['parentId2'] = $source['id'];
    }

    $invoice = $b24->core
        ->call('crm.item.add', [
            'entityTypeId' => 31,
            'fields' => $fields,
        ])
        ->getResponseData()
        ->getResult()['item'];

    if ($sourceRows !== []) {
        $b24->core->call('crm.item.productrow.set', [
            'ownerType' => 'SI',
            'ownerId' => $invoice['id'],
            'productRows' => prepareProductRows($sourceRows),
        ]);
    }

    echo 'Создан смарт-счет ' . $invoice['id'];
    ```

- Python

    ```python
    def prepare_product_rows(rows: list[dict]) -> list[dict]:
        return [
            {
                "productId": row.get("productId"),
                "productName": row.get("productName"),
                "price": row.get("price"),
                "quantity": row.get("quantity", 1),
                "discountTypeId": row.get("discountTypeId"),
                "discountRate": row.get("discountRate"),
                "discountSum": row.get("discountSum"),
                "taxRate": row.get("taxRate"),
                "taxIncluded": row.get("taxIncluded"),
                "measureCode": row.get("measureCode"),
                "sort": row.get("sort", (index + 1) * 10),
            }
            for index, row in enumerate(rows)
        ]

    fields = {
        "title": properties.get("invoice_title", "Счет по документу CRM"),
        "companyId": int(source_item.get("companyId") or 0),
        "contactId": int(source_item.get("contactId") or 0),
        "contactIds": source_item.get("contactIds") or [],
        "mycompanyId": int(properties.get("mycompany_id") or 0),
    }

    if source["entityTypeId"] == 2:
        fields["parentId2"] = source["id"]

    invoice = token.call_method("crm.item.add", {
        "entityTypeId": 31,
        "fields": fields,
    })["result"]["item"]

    if source_rows:
        token.call_method("crm.item.productrow.set", {
            "ownerType": "SI",
            "ownerId": invoice["id"],
            "productRows": prepare_product_rows(source_rows),
        })

    print(f"Создан смарт-счет {invoice['id']}")
    ```

{% endlist %}

Пример успешного ответа `crm.item.add`:

```json
{
    "result": {
        "item": {
            "id": 128,
            "entityTypeId": 31,
            "title": "Счет по документу CRM"
        }
    }
}
```

Сохраните `result.item.id`: это идентификатор созданного смарт-счета. Его нужно передать в `ownerId` метода `crm.item.productrow.set`.

## Проверим результат

Откройте карточку смарт-счета. В ней должны быть заполнены название, клиент, ваша компания и товары из исходного лида или сделки.

Через REST результат можно проверить методом [crm.item.get](../../api-reference/crm/universal/crm-item-get.md). Передайте `entityTypeId = 31` и `id` из ответа `crm.item.add`.

## Диагностика ошибок

Если метод вернул ошибку, проверьте данные запроса.

- `ACCESS_DENIED`, `Application context required` — действие или робот регистрируется не из приложения. Установите приложение и вызовите метод в его контексте
- `ACCESS_DENIED`, `Access denied!` — регистрацию выполняет не администратор
- `ERROR_ACTIVITY_VALIDATION_FAILURE`, `Wrong properties array!` — некорректно заполнены `PROPERTIES` или `RETURN_PROPERTIES`
- `ERROR_ACTIVITY_VALIDATION_FAILURE`, `Wrong activity DOCUMENT_TYPE!` — некорректно указан `DOCUMENT_TYPE` или правило `FILTER`
- `ACCESS_DENIED` при вызове CRM-методов — у пользователя из `AUTH_USER_ID` нет прав на чтение исходного CRM-объекта, создание смарт-счета или изменение товарных позиций счета
- `OWNER_NOT_FOUND` — в `crm.item.productrow.set` передан неверный `ownerType` или `ownerId` смарт-счета
- пустой `productRows` — в исходном лиде или сделке нет товарных позиций, смарт-счет будет создан без товаров

## Что важно учитывать

- Для сделки смарт-счет связывается с исходной сделкой через поле `parentId2`
- Для лида сценарий копирует клиента и товары в смарт-счет. Отдельная связь смарт-счета с лидом через поле `parentId1` в статье по смарт-счетам не описана
- Повторный запуск действия создаст новый смарт-счет. Если дубликаты недопустимы, храните связь между CRM-объектом и созданным счетом в поле CRM или во внешней системе
- Значение `AUTH_USER_ID` определяет, чей токен Битрикс24 передаст обработчику. У этого пользователя должны быть права на чтение исходного CRM-объекта, создание смарт-счета и изменение его товарных позиций
- Параметр `FILTER` ограничивает доступность действия в дизайнере, но не заменяет проверку прав пользователя в CRM

## Продолжите изучение

- [Добавить новое действие bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md)
- [Зарегистрировать нового робота bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md)
- [Получить элемент CRM crm.item.get](../../api-reference/crm/universal/crm-item-get.md)
- [Создать новый элемент CRM crm.item.add](../../api-reference/crm/universal/crm-item-add.md)
- [Получить товарные позиции объекта CRM crm.item.productrow.list](../../api-reference/crm/universal/product-rows/crm-item-productrow-list.md)
- [Сохранить товарную позицию объекта CRM crm.item.productrow.set](../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md)
