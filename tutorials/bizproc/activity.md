# Как добавить действие для создания счета на основании лида или сделки

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пример универсальный для действий бизнес-процессов и роботов. Отличается только метод:
- [bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md) — создать действие бизнес-процесса
- [bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md) — создать робота

В коде примера использован метод `bizproc.activity.add`. Если вы хотите создать робота, замените метод на `bizproc.robot.add`.

{% note info "" %}

Методы `bizproc.activity.add` и `bizproc.robot.add` работают только в контексте [приложения](../../settings/app-installation/index.md). Входящий вебхук не подойдет: метод вернет ошибку `ACCESS_DENIED` с описанием «Application context required». Авторизацию приложения (`access_token`, `domain`) обработчик получает при установке и в каждом вызове.

{% endnote %}

## Инициализация SDK в контексте приложения

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    // Страница приложения открывается внутри iframe Битрикс24
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Bitrix24\SDK\Core\Credentials\ApplicationProfile;
    use Symfony\Component\HttpFoundation\Request;

    $appProfile = ApplicationProfile::initFromArray([
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => 'local.xxxxxxxx.xxxxxxxx',
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => 'yyyyyyyy',
        'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'crm,bizproc',
    ]);
    $b24 = ServiceBuilderFactory::createServiceBuilderFromPlacementRequest(
        Request::createFromGlobals(),
        $appProfile
    );
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import Client, BitrixApp, BitrixToken

    bitrix_app = BitrixApp(client_id="local.xxxxxxxx.xxxxxxxx", client_secret="yyyyyyyy")
    token = BitrixToken(
        domain=auth["domain"],
        auth_token=auth["access_token"],
        refresh_token=auth["refresh_token"],
        bitrix_app=bitrix_app,
    )
    client = Client(token)
    ```

{% endlist %}

## Файл регистрации действия

Замените путь обработчика на ваш публичный URL. В параметре `PROPERTIES` опишите настраиваемые поля действия.

{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.activity.add',
        params: {
            CODE: 'activityAccount',
            HANDLER: 'https://your-domain.example/handler.php',
            AUTH_USER_ID: 1,
            NAME: 'ActivityAccount',
            DESCRIPTION: 'description',
            PROPERTIES: {
                account_title: { Name: 'Format account title', Type: 'string', Required: 'Y', Default: 'Account title' },
                my_company_id: { Name: 'My Company id', Type: 'int', Required: 'Y', Default: '1' },
                pay_system_id: { Name: 'Pay system id', Type: 'int', Required: 'Y', Default: '1' },
            },
        },
        requestId: 'bizproc-activity-add',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }
    ```

- PHP

    ```php
    // Типизированный метод getBizProcScope()->activity()->add(...) принимает
    // локализованные массивы и объект типа документа. Для простого примера
    // вызываем метод напрямую через ядро с плоской структурой параметров.
    $b24->core->call('bizproc.activity.add', [
        'CODE' => 'activityAccount',
        'HANDLER' => 'https://your-domain.example/handler.php',
        'AUTH_USER_ID' => 1,
        'NAME' => 'ActivityAccount',
        'DESCRIPTION' => 'description',
        'PROPERTIES' => [
            'account_title' => ['Name' => 'Format account title', 'Type' => 'string', 'Required' => 'Y', 'Default' => 'Account title'],
            'my_company_id' => ['Name' => 'My Company id', 'Type' => 'int', 'Required' => 'Y', 'Default' => '1'],
            'pay_system_id' => ['Name' => 'Pay system id', 'Type' => 'int', 'Required' => 'Y', 'Default' => '1'],
        ],
    ]);
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError

    try:
        result = client.bizproc.activity.add(
            code="activityAccount",
            handler="https://your-domain.example/handler.php",
            auth_user_id=1,
            name="ActivityAccount",
            description="description",
            properties={
                "account_title": {"Name": "Format account title", "Type": "string", "Required": "Y", "Default": "Account title"},
                "my_company_id": {"Name": "My Company id", "Type": "int", "Required": "Y", "Default": "1"},
                "pay_system_id": {"Name": "Pay system id", "Type": "int", "Required": "Y", "Default": "1"},
            },
        ).response.result
        print(result)
    except BitrixAPIError as error:
        print(error)
    ```

{% endlist %}

## Обработчик действия

Битрикс24 вызывает обработчик при выполнении действия и передает `properties` с настроенными значениями и `document_id` — массив идентификаторов документа вида `['DEAL_123']` или `['LEAD_456']`.

В обработчике определим тип и идентификатор объекта, получим его данные и товарные позиции, затем создадим счет.

{% note warning "" %}

Метод `crm.invoice.add` относится к старым счетам и устарел. В новых интеграциях используйте смарт-счета — универсальные методы [crm.item.add](../../api-reference/crm/universal/crm-item-add.md) с `entityTypeId` смарт-процесса счета. Ниже сохранен вызов `crm.invoice.add` для совместимости со сценарием.

{% endnote %}

{% list tabs %}

- JS

    ```js
    // Серверный обработчик (Node.js). Авторизацию приложения берем из запроса.
    import { B24Hook } from '@bitrix24/b24jssdk'

    export async function handler(req, res) {
        const $b24 = B24Hook.fromWebhookUrl(process.env.B24_APP_HOOK) // или B24OAuth с токеном приложения
        const properties = req.body.properties || {}
        const documentId = req.body.document_id || []

        const dealMatch = documentId.find((v) => v.startsWith('DEAL_'))
        const leadMatch = documentId.find((v) => v.startsWith('LEAD_'))

        let entity, productMethod, idField
        if (dealMatch) {
            entity = await getItem('crm.deal.get', Number(dealMatch.slice(5)))
            productMethod = 'crm.deal.productrows.get'
            idField = Number(dealMatch.slice(5))
        } else if (leadMatch) {
            entity = await getItem('crm.lead.get', Number(leadMatch.slice(5)))
            productMethod = 'crm.lead.productrows.get'
            idField = Number(leadMatch.slice(5))
        } else {
            return res.end()
        }

        async function getItem(method, id) {
            const r = await $b24.actions.v2.call.make({ method, params: { id }, requestId: method })
            return r.getData().result
        }

        const rowsResp = await $b24.actions.v2.call.make({ method: productMethod, params: { id: idField }, requestId: 'rows' })
        const rows = rowsResp.getData().result

        await $b24.actions.v2.call.make({
            method: 'crm.invoice.add',
            params: { fields: {
                ORDER_TOPIC: properties.account_title,
                UF_COMPANY_ID: entity.COMPANY_ID,
                UF_CONTACT_ID: entity.CONTACT_ID,
                UF_DEAL_ID: entity.ID,
                UF_MYCOMPANY_ID: properties.my_company_id,
                PERSON_TYPE_ID: entity.COMPANY_ID > 0 ? 1 : 2,
                PAY_SYSTEM_ID: properties.pay_system_id,
                STATUS_ID: 'N',
                PRODUCT_ROWS: rows,
            } },
            requestId: 'invoice-add',
        })
        res.end()
    }
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    // $b24 построен на токене приложения (см. «Инициализация SDK в контексте приложения»)

    $properties = $_REQUEST['properties'] ?? [];
    $documentId = (array)($_REQUEST['document_id'] ?? []);

    $dealId = 0;
    $leadId = 0;
    foreach ($documentId as $param) {
        if (str_starts_with($param, 'DEAL_')) { $dealId = (int)substr($param, 5); break; }
        if (str_starts_with($param, 'LEAD_')) { $leadId = (int)substr($param, 5); break; }
    }

    if ($dealId > 0) {
        $entity = $b24->getCRMScope()->deal()->get($dealId)->deal();
        $rows = $b24->core->call('crm.deal.productrows.get', ['id' => $dealId])->getResponseData()->getResult();
    } elseif ($leadId > 0) {
        $entity = $b24->getCRMScope()->lead()->get($leadId)->lead();
        $rows = $b24->core->call('crm.lead.productrows.get', ['id' => $leadId])->getResponseData()->getResult();
    } else {
        exit;
    }

    // crm.invoice.add — устаревший метод старых счетов, оставлен для совместимости
    $b24->core->call('crm.invoice.add', [
        'fields' => [
            'ORDER_TOPIC' => $properties['account_title'] ?? '',
            'UF_COMPANY_ID' => $entity->COMPANY_ID,
            'UF_CONTACT_ID' => $entity->CONTACT_ID,
            'UF_DEAL_ID' => $entity->ID,
            'UF_MYCOMPANY_ID' => (int)($properties['my_company_id'] ?? 0),
            'PERSON_TYPE_ID' => $entity->COMPANY_ID > 0 ? 1 : 2,
            'PAY_SYSTEM_ID' => (int)($properties['pay_system_id'] ?? 0),
            'STATUS_ID' => 'N',
            'PRODUCT_ROWS' => $rows,
        ],
    ]);
    ```

- Python

    ```python
    # client и token построены на токене приложения (см. «Инициализация SDK в контексте приложения»)

    # properties и document_id приходят в теле запроса от Битрикс24.
    # Разбор зависит от фреймворка; считаем, что значения уже извлечены:
    properties = ...   # dict настроенных значений полей
    document_id = ...  # список вида ["DEAL_123"] или ["LEAD_456"]

    deal_id = lead_id = 0
    for param in document_id:
        if param.startswith("DEAL_"):
            deal_id = int(param[5:]); break
        if param.startswith("LEAD_"):
            lead_id = int(param[5:]); break

    if deal_id:
        entity = client.crm.deal.get(bitrix_id=deal_id).response.result
        rows = client.crm.deal.productrows.get(bitrix_id=deal_id).response.result
    elif lead_id:
        entity = client.crm.lead.get(bitrix_id=lead_id).response.result
        rows = client.crm.lead.productrows.get(bitrix_id=lead_id).response.result
    else:
        rows = entity = None

    if entity:
        # crm.invoice — устаревший scope, в b24pysdk нет типизированного client.crm.invoice,
        # поэтому вызываем метод напрямую через token.call_method
        token.call_method("crm.invoice.add", {"fields": {
            "ORDER_TOPIC": properties.get("account_title", ""),
            "UF_COMPANY_ID": entity.get("COMPANY_ID"),
            "UF_CONTACT_ID": entity.get("CONTACT_ID"),
            "UF_DEAL_ID": entity.get("ID"),
            "UF_MYCOMPANY_ID": properties.get("my_company_id"),
            "PERSON_TYPE_ID": 1 if int(entity.get("COMPANY_ID") or 0) > 0 else 2,
            "PAY_SYSTEM_ID": properties.get("pay_system_id"),
            "STATUS_ID": "N",
            "PRODUCT_ROWS": rows,
        }})
    ```

{% endlist %}
