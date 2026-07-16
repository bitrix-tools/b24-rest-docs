# Как встроить виджет в лид в виде пользовательского поля

> Scope: [`placement`, `crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы:
>
> - `userfieldtype.add` — администратор
> - `app.info` — любой пользователь
> - `crm.lead.userfield.add` — администратор CRM
> - `crm.item.get` — любой пользователь с правом чтения лида

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пользовательский тип поля позволяет показать интерфейс приложения прямо в карточке лида. В этом сценарии создадим поле с кодом `PHONE_DATA` без префикса `UF_CRM_`.

Если поле пустое, обработчик получает контекст карточки, читает телефон лида и передает найденное значение в форму.

Чтобы встроить виджет в поле лида, последовательно выполним методы и команды:

1. [userfieldtype.add](../../../api-reference/widgets/user-field/userfieldtype-add.md) — зарегистрируем пользовательский тип поля и URL обработчика
2. [app.info](../../../api-reference/common/system/app-info.md) — получим идентификатор приложения и сформируем полный код типа поля
3. [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md) — создадим поле в карточке лида
4. [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) — получим телефон лида в обработчике поля
5. [setValue](../../../api-reference/widgets/ui-interaction/bx24-placement-call.md) — передадим новое значение поля в форму карточки

{% note info "" %}

Для сценария нужен контекст [приложения](../../../settings/app-installation/index.md): методы `userfieldtype.*` зарегистрируют тип поля, а `app.info` вернет `ID` приложения. Входящий вебхук не подойдет.

{% endnote %}

## Как работает сценарий

При регистрации метод `userfieldtype.add` сохраняет обработчик для приватной точки встраивания `USERFIELD_TYPE`.

Когда пользователь открывает карточку лида с полем такого типа, Битрикс24 открывает URL обработчика внутри поля и передает ему `PLACEMENT_OPTIONS`. В режиме редактирования обработчик может изменить значение поля вызовом:

```js
$b24.placement.setValue(value)
```

Метод `setValue` принимает само значение поля и записывает его в скрытое поле формы карточки. В лиде значение сохранится после сохранения карточки. В режиме просмотра обработчик может только показать интерфейс или текстовое значение.

## Подготовьте обработчик

Создайте страницу приложения с публичным адресом. Этот адрес понадобится в параметре `HANDLER` метода `userfieldtype.add`. Рекомендуем использовать HTTPS, чтобы браузер не блокировал загрузку содержимого поля.

Адрес обработчика должен использовать протокол `http` или `https` и содержать домен.

В примерах ниже используется адрес:

```text
https://your-domain.example/handler.php
```

Все вызовы выполняются в контексте установленного приложения. Авторизацию (`access_token`, `domain`) приложение получает при установке и в каждом вызове обработчика. Ниже — как инициализировать SDK в этом контексте:

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    // Страница приложения открывается внутри iframe Битрикс24
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()
    // ... вызовы $b24.actions.v2.call.make(...) и $b24.placement.*
    // в конце работы страницы: $b24.destroy()
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Credentials\ApplicationProfile;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\HttpFoundation\Request;

    $appProfile = ApplicationProfile::initFromArray([
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => 'local.xxxxxxxx.xxxxxxxx',
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => 'yyyyyyyy',
        'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'crm,placement',
    ]);

    // Битрикс24 передает DOMAIN и токен приложения в запросе обработчика
    $b24 = ServiceBuilderFactory::createServiceBuilderFromPlacementRequest(
        Request::createFromGlobals(),
        $appProfile
    );
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import BitrixApp, BitrixToken, Client

    bitrix_app = BitrixApp(
        client_id="local.xxxxxxxx.xxxxxxxx",
        client_secret="yyyyyyyy",
    )

    # auth приходит в запросе установки или вызова приложения
    client = Client(BitrixToken(
        domain=auth["domain"],
        auth_token=auth["access_token"],
        refresh_token=auth["refresh_token"],
        bitrix_app=bitrix_app,
    ))
    ```

{% endlist %}

## 1\. Зарегистрируем тип поля

Зарегистрируйте тип поля методом [userfieldtype.add](../../../api-reference/widgets/user-field/userfieldtype-add.md). Укажите код типа, URL обработчика и настройки отображения поля.

- `USER_TYPE_ID` — строковый код типа. Укажем `phone_data`

- `HANDLER` — публичный URL обработчика поля. Передадим `https://your-domain.example/handler.php`

- `TITLE` — название типа поля в интерфейсе настроек. Укажем `Phone data`

- `DESCRIPTION` — описание типа поля

- `OPTIONS` — дополнительные настройки. В примере зададим высоту поля `height: 60`

{% list tabs %}

- JS

    ```js
    const handlerUrl = 'https://your-domain.example/handler.php'
    const userTypeId = 'phone_data'

    const response = await $b24.actions.v2.call.make({
        method: 'userfieldtype.add',
        params: {
            USER_TYPE_ID: userTypeId,
            HANDLER: handlerUrl,
            TITLE: 'Phone data',
            DESCRIPTION: 'Lead phone data field',
            OPTIONS: {
                height: 60,
            },
        },
        requestId: 'userfieldtype-add',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    console.info('User field type registered')
    ```

- PHP

    ```php
    <?php
    $handlerUrl = 'https://your-domain.example/handler.php';
    $userTypeId = 'phone_data';

    // Типизированный аналог не принимает OPTIONS:
    // $b24->getPlacementScope()->userfieldtype()->add($userTypeId, $handlerUrl, 'Phone data', 'Lead phone data field');
    // Чтобы передать OPTIONS (height), вызываем метод напрямую через ядро:
    $response = $b24->core->call('userfieldtype.add', [
        'USER_TYPE_ID' => $userTypeId,
        'HANDLER' => $handlerUrl,
        'TITLE' => 'Phone data',
        'DESCRIPTION' => 'Lead phone data field',
        'OPTIONS' => ['height' => 60],
    ]);

    // core->call оборачивает скалярный результат в массив
    $isRegistered = $response->getResponseData()->getResult()[0];
    echo $isRegistered ? 'User field type registered' : 'Error';
    ```

- Python

    ```python
    bitrix_response = client.userfieldtype.add(
        "phone_data",
        "https://your-domain.example/handler.php",
        title="Phone data",
        description="Lead phone data field",
        options={"height": 60},
    ).response
    print("User field type registered" if bitrix_response.result else "Error")
    ```

{% endlist %}

Если тип поля успешно зарегистрирован, метод вернет `true`. Если получили ошибку `error`, изучите описание возможных ошибок в документации метода [userfieldtype.add](../../../api-reference/widgets/user-field/userfieldtype-add.md).

```json
{
    "result": true,
    "time": {
        "start": 1724421710.397825,
        "finish": 1724421711.040353,
        "duration": 0.6425280570983887,
        "processing": 0.00005888938903808594,
        "date_start": "2024-08-23T16:01:50+02:00",
        "date_finish": "2024-08-23T16:01:51+02:00",
        "operating": 0
    }
}
```

Метод регистрирует тип с коротким кодом `phone_data`. Для создания поля в CRM понадобится полный код вида `rest_<APP_ID>_phone_data`.

## 2\. Получим идентификатор приложения

Получите идентификатор приложения методом [app.info](../../../api-reference/common/system/app-info.md). Метод не принимает параметры. В ответе понадобится поле `ID`.

{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'app.info',
        params: {},
        requestId: 'app-info',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    const applicationId = response.getData().result.ID
    const fullUserTypeId = `rest_${applicationId}_phone_data`

    console.info('Full user type ID: ' + fullUserTypeId)
    ```

- PHP

    ```php
    <?php
    use Bitrix24\SDK\Core\Exceptions\BaseException;

    try
    {
        $applicationId = $b24->getMainScope()->main()->getApplicationInfo()->applicationInfo()->ID;
        $fullUserTypeId = 'rest_' . $applicationId . '_phone_data';

        echo 'Full user type ID: ' . $fullUserTypeId;
    }
    catch (BaseException $exception)
    {
        echo $exception->getMessage();
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError

    try:
        application_id = client.app.info().response.result["ID"]
        full_user_type_id = f"rest_{application_id}_phone_data"

        print("Full user type ID:", full_user_type_id)
    except BitrixAPIError as error:
        print(error)
    ```

{% endlist %}

Для приложения с `ID = 123` полный код типа будет `rest_123_phone_data`.

Фрагмент ответа:

```json
{
    "result": {
        "ID": 123,
        "INSTALLED": true
    }
}
```

Если `INSTALLED` имеет значение `false`, завершите установку приложения — в B24JsSDK для этого есть метод `$b24.installFinish()`. Подробнее — в описании [BX24.installFinish](../../../sdk/bx24-js-sdk/system-functions/bx24-install-finish.md).

## 3\. Создадим поле лида

Создайте пользовательское поле лида методом [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md). В объекте `fields` укажите настройки поля.

- `USER_TYPE_ID` — полный код зарегистрированного типа поля. Для приложения с `ID = 123` передадим `rest_123_phone_data`

- `FIELD_NAME` — код поля без префикса `UF_CRM_`. Укажем `PHONE_DATA`

- `XML_ID` — внешний код поля. В примере совпадает с `FIELD_NAME`

- `MANDATORY` — обязательность поля. Передадим `N`

- `SHOW_IN_LIST` — показывать ли поле в списке. В CRM этот параметр не влияет на отображение поля, но оставим его в запросе как стандартный параметр пользовательского поля

- `EDIT_IN_LIST` — можно ли редактировать поле. Передадим `Y`

- `EDIT_FORM_LABEL` — подпись поля в карточке лида

- `LIST_COLUMN_LABEL` — заголовок поля в списке

- `SETTINGS` — настройки создаваемого пользовательского поля CRM. Для пользовательского типа передадим пустой объект

{% list tabs %}

- JS

    ```js
    const applicationId = 123
    const registeredUserTypeId = 'phone_data'
    const userTypeId = `rest_${applicationId}_${registeredUserTypeId}`
    const fieldName = 'PHONE_DATA'

    const response = await $b24.actions.v2.call.make({
        method: 'crm.lead.userfield.add',
        params: {
            fields: {
                USER_TYPE_ID: userTypeId,
                FIELD_NAME: fieldName,
                XML_ID: fieldName,
                MANDATORY: 'N',
                SHOW_IN_LIST: 'Y',
                EDIT_IN_LIST: 'Y',
                EDIT_FORM_LABEL: 'Phone data',
                LIST_COLUMN_LABEL: 'Phone data',
                SETTINGS: {},
            },
        },
        requestId: 'lead-userfield-add',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    console.info('Lead field created, ID: ' + response.getData().result)
    ```

- PHP

    ```php
    <?php
    use Bitrix24\SDK\Core\Exceptions\BaseException;

    $applicationId = 123;
    $registeredUserTypeId = 'phone_data';
    $userTypeId = 'rest_' . $applicationId . '_' . $registeredUserTypeId;
    $fieldName = 'PHONE_DATA';

    try
    {
        $fieldId = $b24->getCRMScope()->leadUserfield()->add([
            'USER_TYPE_ID' => $userTypeId,
            'FIELD_NAME' => $fieldName,
            'XML_ID' => $fieldName,
            'MANDATORY' => 'N',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'EDIT_FORM_LABEL' => 'Phone data',
            'LIST_COLUMN_LABEL' => 'Phone data',
            'SETTINGS' => [],
        ])->getId();

        echo 'Lead field created, ID: ' . $fieldId;
    }
    catch (BaseException $exception)
    {
        echo $exception->getMessage();
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError

    application_id = 123
    registered_user_type_id = "phone_data"
    user_type_id = f"rest_{application_id}_{registered_user_type_id}"
    field_name = "PHONE_DATA"

    try:
        bitrix_response = client.crm.lead.userfield.add(
            fields={
                "USER_TYPE_ID": user_type_id,
                "FIELD_NAME": field_name,
                "XML_ID": field_name,
                "MANDATORY": "N",
                "SHOW_IN_LIST": "Y",
                "EDIT_IN_LIST": "Y",
                "EDIT_FORM_LABEL": "Phone data",
                "LIST_COLUMN_LABEL": "Phone data",
                "SETTINGS": {},
            },
        ).response
        print("Lead field created, ID:", bitrix_response.result)
    except BitrixAPIError as error:
        print(error)
    ```

{% endlist %}

Если поле успешно создано, метод вернет его идентификатор. Если получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md).

```json
{
    "result": 6997,
    "time": {
        "start": 1753789240.8146,
        "finish": 1753789241.058695,
        "duration": 0.2440950870513916,
        "processing": 0.19217395782470703,
        "date_start": "2025-07-29T14:40:40+03:00",
        "date_finish": "2025-07-29T14:40:41+03:00",
        "operating_reset_at": 1753789840,
        "operating": 0.19216084480285645
    }
}
```

После создания поле появится в списке пользовательских полей лида. Чтобы увидеть его в карточке, добавьте поле в форму карточки лида.

## 4\. Обработаем вызов поля

Когда пользователь открывает карточку лида, Битрикс24 вызывает обработчик с `PLACEMENT=USERFIELD_TYPE`. В `PLACEMENT_OPTIONS` приходят параметры пользовательского поля и идентификатор текущего лида.

Обработчик выполняет два действия:

1. Если поле пустое, получим телефон лида методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md)
2. Передадим новое значение в форму карточки методом `setValue`

Для лида в `crm.item.get` укажите `entityTypeId: 1`. В параметр `id` передайте идентификатор лида из `PLACEMENT_OPTIONS.ENTITY_VALUE_ID`. Если карточка уже сохранена, `ENTITY_VALUE_ID` содержит идентификатор лида. Для новой карточки значение может быть `0`.

Если поле уже содержит значение, обработчик покажет его без повторной загрузки телефона.

Записать значение в форму карточки может только код, который выполняется в iframe поля, поэтому `setValue` вызывается из JS. В вариантах PHP и Python сервер получает телефон лида и отдает готовую страницу, а запись значения выполняет небольшой JS-фрагмент на этой странице.

{% list tabs %}

- JS

    ```html
    <!DOCTYPE html>
    <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Phone data</title>
        </head>
        <body style="margin: 0; padding: 0;">
            <div id="field-content"></div>

            <script type="module">
                // npm install @bitrix24/b24jssdk
                import { initializeB24Frame } from '@bitrix24/b24jssdk'

                const $b24 = await initializeB24Frame()
                const options = $b24.placement.options
                const container = document.getElementById('field-content')

                if ($b24.placement.placement !== 'USERFIELD_TYPE') {
                    container.textContent = 'Не удалось определить тип встройки'
                } else {
                    let value = options.VALUE || ''
                    const leadId = Number(options.ENTITY_VALUE_ID)

                    if (
                        value === ''
                        && options.ENTITY_ID === 'CRM_LEAD'
                        && Number.isInteger(leadId)
                        && leadId > 0
                    ) {
                        const response = await $b24.actions.v2.call.make({
                            method: 'crm.item.get',
                            params: {
                                entityTypeId: 1,
                                id: leadId,
                            },
                            requestId: 'lead-get',
                        })

                        if (!response.isSuccess) {
                            console.error(response.getErrorMessages().join('; '))
                        } else {
                            const item = response.getData().result.item
                            const phone = (item?.fm || [])
                                .find((field) => field.typeId === 'PHONE' && field.value)
                                ?.value
                                ?.trim()
                                || item?.phone?.trim()
                                || ''

                            value = phone ? 'Lead phone: ' + phone : 'Phone is empty'
                        }
                    }

                    renderValue(value)
                }

                function renderValue(value) {
                    document.body.style.backgroundColor =
                        options.MODE === 'edit' ? '#fff' : '#f9fafb'

                    if (options.MODE === 'edit') {
                        container.innerHTML =
                            '<input id="phone-data" type="text" style="width: 90%;" />'
                        const input = document.getElementById('phone-data')

                        input.value = value
                        input.addEventListener('keyup', () => $b24.placement.setValue(input.value))
                        $b24.placement.setValue(value)
                    } else {
                        container.textContent = value
                    }
                }
            </script>
        </body>
    </html>
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Credentials\ApplicationProfile;
    use Bitrix24\SDK\Core\Exceptions\BaseException;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\HttpFoundation\Request;

    $request = Request::createFromGlobals();

    $placement = (string)$request->request->get('PLACEMENT', '');
    $placementOptions = json_decode(
        (string)$request->request->get('PLACEMENT_OPTIONS', '{}'),
        true
    );

    if ($placement !== 'USERFIELD_TYPE' || !is_array($placementOptions))
    {
        exit;
    }

    $value = (string)($placementOptions['VALUE'] ?? '');
    $errorMessage = '';

    if (
        $value === ''
        && ($placementOptions['ENTITY_ID'] ?? '') === 'CRM_LEAD'
        && (int)($placementOptions['ENTITY_VALUE_ID'] ?? 0) > 0
    )
    {
        $appProfile = ApplicationProfile::initFromArray([
            'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => 'local.xxxxxxxx.xxxxxxxx',
            'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => 'yyyyyyyy',
            'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'crm,placement',
        ]);

        try
        {
            // SDK возьмет DOMAIN и токен пользователя, открывшего карточку, из запроса
            $b24 = ServiceBuilderFactory::createServiceBuilderFromPlacementRequest(
                $request,
                $appProfile
            );

            $item = $b24->getCRMScope()->item()->get(
                1,
                (int)$placementOptions['ENTITY_VALUE_ID']
            )->item();

            $phone = '';

            foreach (($item->fm ?? []) as $field)
            {
                if (
                    ($field['typeId'] ?? '') === 'PHONE'
                    && trim((string)($field['value'] ?? '')) !== ''
                )
                {
                    $phone = trim((string)$field['value']);
                    break;
                }
            }

            $value = $phone !== '' ? 'Lead phone: ' . $phone : 'Phone is empty';
        }
        catch (BaseException $exception)
        {
            $errorMessage = $exception->getMessage();
        }
    }
    ?>
    <!DOCTYPE html>
    <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Phone data</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: <?=($placementOptions['MODE'] ?? '') === 'edit' ? '#fff' : '#f9fafb'?>;">
            <?php if ($errorMessage !== ''): ?>
                <div><?=htmlspecialchars($errorMessage, ENT_QUOTES, 'UTF-8')?></div>
            <?php endif; ?>

            <?php if (($placementOptions['MODE'] ?? '') === 'edit'): ?>
                <input
                    id="phone-data"
                    type="text"
                    style="width: 90%;"
                    value="<?=htmlspecialchars($value, ENT_QUOTES, 'UTF-8')?>"
                >
                <script type="module">
                    // Значение в форму карточки записывает код внутри iframe поля
                    import { initializeB24Frame } from '@bitrix24/b24jssdk'

                    const $b24 = await initializeB24Frame()
                    const input = document.getElementById('phone-data')

                    input.addEventListener('keyup', () => $b24.placement.setValue(input.value))
                    $b24.placement.setValue(input.value)
                </script>
            <?php else: ?>
                <?=htmlspecialchars($value, ENT_QUOTES, 'UTF-8')?>
            <?php endif; ?>
        </body>
    </html>
    ```

- Python

    ```python
    # pip install b24pysdk flask
    from flask import Flask, request
    from b24pysdk import BitrixApp, BitrixToken, Client
    from b24pysdk.errors import BitrixAPIError
    from markupsafe import escape
    import json

    app = Flask(__name__)

    bitrix_app = BitrixApp(
        client_id="local.xxxxxxxx.xxxxxxxx",
        client_secret="yyyyyyyy",
    )


    @app.post("/handler")
    def handler():
        placement = request.form.get("PLACEMENT", "")
        options = json.loads(request.form.get("PLACEMENT_OPTIONS", "{}") or "{}")

        if placement != "USERFIELD_TYPE":
            return ""

        value = options.get("VALUE") or ""
        error_message = ""
        lead_id = int(options.get("ENTITY_VALUE_ID", 0))

        if value == "" and options.get("ENTITY_ID") == "CRM_LEAD" and lead_id > 0:
            # Битрикс24 передает обработчику домен и токен пользователя
            client = Client(
                BitrixToken(
                    domain=request.args.get("DOMAIN", ""),
                    auth_token=request.form.get("AUTH_ID", ""),
                    bitrix_app=bitrix_app,
                )
            )

            try:
                item = client.crm.item.get(
                    entity_type_id=1,
                    bitrix_id=lead_id,
                ).response.result["item"]

                phone = next(
                    (
                        field["value"].strip()
                        for field in item.get("fm") or []
                        if field.get("typeId") == "PHONE" and (field.get("value") or "").strip()
                    ),
                    (item.get("phone") or "").strip(),
                )

                value = f"Lead phone: {phone}" if phone else "Phone is empty"
            except BitrixAPIError as error:
                error_message = str(error)

        background = "#fff" if options.get("MODE") == "edit" else "#f9fafb"

        if options.get("MODE") == "edit":
            # Значение в форму карточки записывает код внутри iframe поля
            script = """<script type="module">
                    import { initializeB24Frame } from '@bitrix24/b24jssdk'

                    const $b24 = await initializeB24Frame()
                    const input = document.getElementById('phone-data')

                    input.addEventListener('keyup', () => $b24.placement.setValue(input.value))
                    $b24.placement.setValue(input.value)
                </script>"""

            body = f"""
                <input id="phone-data" type="text" style="width: 90%;" value="{escape(value)}">
                {script}
            """
        else:
            body = escape(value)

        return f"""<!DOCTYPE html>
    <html lang="ru">
        <head><meta charset="UTF-8"><title>Phone data</title></head>
        <body style="margin: 0; padding: 0; background-color: {background};">
            {f'<div>{escape(error_message)}</div>' if error_message else ''}
            {body}
        </body>
    </html>"""
    ```

{% endlist %}

Метод `crm.item.get` возвращает объект `item` с полями лида. В примере телефон берется из массива `fm`, который содержит множественные поля: телефоны, e-mail, сайты и мессенджеры.

```json
{
    "result": {
        "item": {
            "id": 123,
            "phone": "+79990000000",
            "fm": [
                {
                    "id": 456,
                    "valueType": "WORK",
                    "value": "+79990000000",
                    "typeId": "PHONE"
                }
            ]
        }
    }
}
```

## Что получает обработчик

В HTTP-запросе обработчика `PLACEMENT_OPTIONS` передается как JSON-строка. В B24JsSDK свойство `$b24.placement.options` возвращает эти данные уже как объект. В PHP и Python JSON-строку из запроса нужно преобразовать самостоятельно — например, функцией `json_decode` или `json.loads`.

#|
|| **Поле**
`тип` | **Описание** ||
|| **MODE**
[`string`](../../../api-reference/data-types.md) | Режим отображения поля. В исходном коде используются значения `edit` и `view` ||
|| **ENTITY_ID**
[`string`](../../../api-reference/data-types.md) | Код объекта, в карточке которого открыто поле. Для лида приходит `CRM_LEAD` ||
|| **FIELD_NAME**
[`string`](../../../api-reference/data-types.md) | Полное имя пользовательского поля с префиксом `UF_CRM_`. Для поля `PHONE_DATA` придет `UF_CRM_PHONE_DATA` ||
|| **ENTITY_VALUE_ID**
[`string`, `integer`](../../../api-reference/data-types.md) | Идентификатор элемента CRM. В этом сценарии — идентификатор лида. Для новой карточки может иметь значение `0` ||
|| **VALUE**
[`string`, `array`, `null`](../../../api-reference/data-types.md) | Текущее значение поля. Для одиночного поля приходит одно значение, для множественного — массив ||
|| **MULTIPLE**
[`string`](../../../api-reference/data-types.md) | Признак множественного поля: `Y` или `N` ||
|| **MANDATORY**
[`string`](../../../api-reference/data-types.md) | Признак обязательного поля: `Y` или `N` ||
|| **XML_ID**
[`string`, `null`](../../../api-reference/data-types.md) | Внешний код поля ||
|#

## Проверьте виджет

1. Выполните `userfieldtype.add` и убедитесь, что метод вернул `true`
2. Выполните `app.info`, подставьте `result.ID` в полный код типа `rest_<APP_ID>_phone_data`
3. Создайте поле методом `crm.lead.userfield.add` и добавьте его в форму карточки лида
4. Откройте сохраненный лид с заполненным телефоном и проверьте значение поля в режиме просмотра
5. Перейдите в режим редактирования, измените значение поля и сохраните карточку
6. Снова откройте лид и убедитесь, что новое значение сохранилось

Если сценарий не работает:

- ошибка «Указан неверный пользовательский тип» означает, что в `crm.lead.userfield.add` передан короткий код вместо `rest_<APP_ID>_phone_data` или установка приложения не завершена
- если поле не загружается, проверьте HTTPS-адрес `HANDLER`, его домен и доступность из интернета
- ошибка `ACCESS_DENIED` в `crm.item.get` означает, что у пользователя нет права на чтение лида
- при ошибке `NOT_FOUND` в `crm.item.get` проверьте `ENTITY_VALUE_ID` и значение `entityTypeId`
- если интерфейс поля не запускается, проверьте подключение SDK и то, что клиентский код выполняется после `initializeB24Frame()`

## Как адаптировать сценарий для других карточек CRM

Чтобы встроить такое же поле в другую карточку CRM, замените метод создания поля, проверку `ENTITY_ID` и значение `entityTypeId` в `crm.item.get`.

#|
|| **Карточка CRM** | **Метод создания поля** | **ENTITY_ID** | **entityTypeId** ||
|| Лид | [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md) | `CRM_LEAD` | `1` ||
|| Сделка | [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) | `CRM_DEAL` | `2` ||
|| Контакт | [crm.contact.userfield.add](../../../api-reference/crm/contacts/userfield/crm-contact-userfield-add.md) | `CRM_CONTACT` | `3` ||
|| Компания | [crm.company.userfield.add](../../../api-reference/crm/companies/userfields/crm-company-userfield-add.md) | `CRM_COMPANY` | `4` ||
|#

## Продолжите изучение

- [Пользовательские типы полей в CRM](../../../api-reference/crm/universal/user-defined-fields/userfield-type.md)
- [Получить информацию о приложении app.info](../../../api-reference/common/system/app-info.md)
- [Получить список типов пользовательских полей userfieldtype.list](../../../api-reference/widgets/user-field/userfieldtype-list.md)
- [Вызвать команду интерфейса BX24.placement.call](../../../api-reference/widgets/ui-interaction/bx24-placement-call.md)
- [{#T}](../../../sdk/b24jssdk/index.md)
