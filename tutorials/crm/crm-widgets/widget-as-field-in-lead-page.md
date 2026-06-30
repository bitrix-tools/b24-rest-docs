# Как встроить виджет в лид в виде пользовательского поля

> Scope: [`placement`, `crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы:
>
> - `userfieldtype.add` — администратор
> - `crm.lead.userfield.add` — администратор CRM
> - `crm.item.get` — любой пользователь с правом чтения лида

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пользовательский тип поля позволяет показать интерфейс приложения прямо в карточке лида. В этом сценарии рассмотрим пример пользовательского поля с кодом `PHONE_DATA` без префикса `UF_CRM_`.

Обработчик получает контекст карточки, читает телефон лида и записывает найденные данные в поле.

Чтобы встроить виджет в поле лида, последовательно выполним методы и команды:

1. [userfieldtype.add](../../../api-reference/widgets/user-field/userfieldtype-add.md) — зарегистрируем пользовательский тип поля и URL обработчика
2. [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md) — создадим поле в карточке лида
3. [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) — получим телефон лида в обработчике поля
4. [BX24.placement.call](../../../api-reference/widgets/ui-interaction/bx24-placement-call.md) — передадим новое значение поля в форму карточки

{% note info "" %}

Методы `userfieldtype.*` работают только в контексте [приложения](../../../settings/app-installation/index.md). Входящий вебхук не подойдет для регистрации пользовательского типа поля.

{% endnote %}

## Как работает сценарий

При регистрации метод `userfieldtype.add` сохраняет обработчик для приватной точки встраивания `USERFIELD_TYPE`.

Когда пользователь открывает карточку лида с полем такого типа, Битрикс24 открывает URL обработчика внутри поля и передает ему `PLACEMENT_OPTIONS`. В режиме редактирования обработчик может изменить значение поля вызовом:

```js
BX24.placement.call('setValue', value);
```

Команда `setValue` записывает значение в скрытое поле формы карточки. В лиде оно сохранится после сохранения карточки. В режиме просмотра обработчик может только показать интерфейс или текстовое значение.

## Подготовьте обработчик

Создайте страницу приложения с публичным HTTPS-адресом. Этот адрес понадобится в параметре `HANDLER` метода `userfieldtype.add`.

В примерах ниже используется адрес:

```text
https://your-domain.example/handler.php
```

## 1\. Зарегистрируем тип поля

Зарегистрируем тип поля с помощью [userfieldtype.add](../../../api-reference/widgets/user-field/userfieldtype-add.md). В метод передадим код типа, URL обработчика и настройки отображения поля.

- `USER_TYPE_ID` — строковый код типа. Укажем `phone_data`

- `HANDLER` — публичный URL обработчика поля. Передадим `https://your-domain.example/handler.php`

- `TITLE` — название типа поля в интерфейсе настроек. Укажем `Phone data`

- `DESCRIPTION` — описание типа поля

- `OPTIONS` — дополнительные настройки. В примере зададим высоту поля `height: 60`

{% list tabs %}

- JS

    ```js
    const handlerUrl = 'https://your-domain.example/handler.php';
    const userTypeId = 'phone_data';

    BX24.callMethod(
        'userfieldtype.add',
        {
            USER_TYPE_ID: userTypeId,
            HANDLER: handlerUrl,
            TITLE: 'Phone data',
            DESCRIPTION: 'Lead phone data field',
            OPTIONS: {
                height: 60,
            },
        },
        (result) => {
            if (result.error())
            {
                console.error(result.error() + ': ' + result.error_description());
                return;
            }

            console.info('User field type registered');
        }
    );
    ```

- PHP CRest

    ```php
    <?php
    require_once('crest.php');

    $handlerUrl = 'https://your-domain.example/handler.php';
    $userTypeId = 'phone_data';

    $result = CRest::call(
        'userfieldtype.add',
        [
            'USER_TYPE_ID' => $userTypeId,
            'HANDLER' => $handlerUrl,
            'TITLE' => 'Phone data',
            'DESCRIPTION' => 'Lead phone data field',
            'OPTIONS' => [
                'height' => 60,
            ],
        ]
    );

    if (!empty($result['error']))
    {
        echo $result['error'] . ': ' . $result['error_description'];
    }
    else
    {
        echo 'User field type registered';
    }
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

Теперь тип `phone_data` можно использовать при создании пользовательского поля в CRM.

## 2\. Создадим поле лида

Создадим пользовательское поле лида с помощью [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md). В метод передадим объект `fields` с настройками поля.

- `USER_TYPE_ID` — код зарегистрированного типа поля. Передадим `phone_data`

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
    const userTypeId = 'phone_data';
    const fieldName = 'PHONE_DATA';

    BX24.callMethod(
        'crm.lead.userfield.add',
        {
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
        (result) => {
            if (result.error())
            {
                console.error(result.error() + ': ' + result.error_description());
                return;
            }

            console.info('Lead field created, ID: ' + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    <?php
    require_once('crest.php');

    $userTypeId = 'phone_data';
    $fieldName = 'PHONE_DATA';

    $result = CRest::call(
        'crm.lead.userfield.add',
        [
            'fields' => [
                'USER_TYPE_ID' => $userTypeId,
                'FIELD_NAME' => $fieldName,
                'XML_ID' => $fieldName,
                'MANDATORY' => 'N',
                'SHOW_IN_LIST' => 'Y',
                'EDIT_IN_LIST' => 'Y',
                'EDIT_FORM_LABEL' => 'Phone data',
                'LIST_COLUMN_LABEL' => 'Phone data',
                'SETTINGS' => [],
            ],
        ]
    );

    if (!empty($result['error']))
    {
        echo $result['error'] . ': ' . $result['error_description'];
    }
    else
    {
        echo 'Lead field created, ID: ' . $result['result'];
    }
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

## 3\. Обработаем вызов поля

Когда пользователь открывает карточку лида, Битрикс24 вызывает обработчик с `PLACEMENT=USERFIELD_TYPE`. В `PLACEMENT_OPTIONS` приходят параметры пользовательского поля и идентификатор текущего лида.

В обработчике выполним два действия:

1. Получим телефон лида методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md)
2. Передадим новое значение в форму карточки командой [BX24.placement.call](../../../api-reference/widgets/ui-interaction/bx24-placement-call.md) с командой `setValue`

В `crm.item.get` передадим `entityTypeId: 1`, потому что `1` — идентификатор типа объекта CRM «Лид». В параметр `id` передадим идентификатор лида из `PLACEMENT_OPTIONS.ENTITY_VALUE_ID`. Если карточка уже сохранена, `ENTITY_VALUE_ID` содержит идентификатор лида. Для новой карточки значение может быть `0`.

{% list tabs %}

- JS

    ```js
    const placementOptions = BX24.getPlacementOptions();

    if (BX24.getPlacement() === 'USERFIELD_TYPE')
    {
        const currentValue = placementOptions.VALUE || '';

        if (
            placementOptions.ENTITY_ID === 'CRM_LEAD'
            && Number(placementOptions.ENTITY_VALUE_ID) > 0
        )
        {
            BX24.callMethod(
                'crm.item.get',
                {
                    entityTypeId: 1,
                    id: Number(placementOptions.ENTITY_VALUE_ID),
                },
                (result) => {
                    if (result.error())
                    {
                        renderValue(currentValue);
                        console.error(result.error() + ': ' + result.error_description());
                        return;
                    }

                    const item = result.data().item;
                    const phone = (item?.fm || [])
                        .find((field) => field.typeId === 'PHONE' && field.value)
                        ?.value
                        ?.trim()
                        || item?.phone?.trim()
                        || '';
                    const value = phone ? 'Lead phone: ' + phone : 'Phone is empty';

                    renderValue(value);
                }
            );
        }
        else
        {
            renderValue(currentValue);
        }
    }

    function renderValue(value)
    {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.backgroundColor = placementOptions.MODE === 'edit' ? '#fff' : '#f9fafb';

        if (placementOptions.MODE === 'edit')
        {
            document.body.innerHTML = '<input id="phone-data" type="text" style="width: 90%;" />';
            const input = document.getElementById('phone-data');

            input.value = value;
            input.addEventListener('keyup', () => setValue(input.value));
            setValue(value);
        }
        else
        {
            document.body.textContent = value;
        }
    }

    function setValue(value)
    {
        BX24.placement.call('setValue', value);
    }
    ```

- PHP CRest

    ```php
    <?php
    require_once('crest.php');

    $placement = $_REQUEST['PLACEMENT'] ?? '';
    $placementOptions = isset($_REQUEST['PLACEMENT_OPTIONS'])
        ? json_decode($_REQUEST['PLACEMENT_OPTIONS'], true)
        : [];

    if ($placement !== 'USERFIELD_TYPE')
    {
        exit;
    }

    $value = $placementOptions['VALUE'] ?? '';

    if (
        ($placementOptions['ENTITY_ID'] ?? '') === 'CRM_LEAD'
        && (int)($placementOptions['ENTITY_VALUE_ID'] ?? 0) > 0
    )
    {
        $lead = CRest::call(
            'crm.item.get',
            [
                'entityTypeId' => 1,
                'id' => (int)$placementOptions['ENTITY_VALUE_ID'],
            ]
        );

        $item = $lead['result']['item'] ?? [];
        $phone = '';

        foreach (($item['fm'] ?? []) as $field)
        {
            if (($field['typeId'] ?? '') === 'PHONE' && trim((string)($field['value'] ?? '')) !== '')
            {
                $phone = trim((string)$field['value']);
                break;
            }
        }

        if ($phone === '')
        {
            $phone = trim((string)($item['phone'] ?? ''));
        }

        $value = $phone !== '' ? 'Lead phone: ' . trim($phone) : 'Phone is empty';
    }
    ?>
    <!DOCTYPE html>
    <html>
        <head>
            <script src="//api.bitrix24.com/api/v1/"></script>
        </head>
        <body style="margin: 0; padding: 0; background-color: <?=($placementOptions['MODE'] ?? '') === 'edit' ? '#fff' : '#f9fafb'?>;">
            <?php if (($placementOptions['MODE'] ?? '') === 'edit'): ?>
                <input id="phone-data" type="text" style="width: 90%;" value="<?=htmlspecialchars($value)?>">
                <script>
                    const input = document.getElementById('phone-data');

                    function setValue(value)
                    {
                        BX24.placement.call('setValue', value);
                    }

                    input.addEventListener('keyup', () => setValue(input.value));
                    setValue(input.value);
                </script>
            <?php else: ?>
                <?=htmlspecialchars($value)?>
            <?php endif; ?>
        </body>
    </html>
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

В HTTP-запросе обработчика `PLACEMENT_OPTIONS` передается как JSON-строка. Метод `BX24.getPlacementOptions()` возвращает эти данные уже как объект. В PHP `$_REQUEST['PLACEMENT_OPTIONS']` содержит JSON-строку, которую нужно преобразовать в массив.

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
[`string`](../../../api-reference/data-types.md) | Идентификатор элемента CRM. В этом сценарии — идентификатор лида ||
|| **VALUE**
[`string`, `array`, `null`](../../../api-reference/data-types.md) | Текущее значение поля. Для одиночного поля приходит одно значение, для множественного — массив ||
|| **MULTIPLE**
[`string`](../../../api-reference/data-types.md) | Признак множественного поля: `Y` или `N` ||
|| **MANDATORY**
[`string`](../../../api-reference/data-types.md) | Признак обязательного поля: `Y` или `N` ||
|| **XML_ID**
[`string`, `null`](../../../api-reference/data-types.md) | Внешний код поля ||
|#
