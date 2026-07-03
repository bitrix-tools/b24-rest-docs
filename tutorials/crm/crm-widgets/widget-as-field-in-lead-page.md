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
5. [BX24.placement.call](../../../api-reference/widgets/ui-interaction/bx24-placement-call.md) — передадим новое значение поля в форму карточки

{% note info "" %}

Для сценария нужен контекст [приложения](../../../settings/app-installation/index.md): методы `userfieldtype.*` зарегистрируют тип поля, а `app.info` вернет `ID` приложения. Входящий вебхук не подойдет.

{% endnote %}

## Как работает сценарий

При регистрации метод `userfieldtype.add` сохраняет обработчик для приватной точки встраивания `USERFIELD_TYPE`.

Когда пользователь открывает карточку лида с полем такого типа, Битрикс24 открывает URL обработчика внутри поля и передает ему `PLACEMENT_OPTIONS`. В режиме редактирования обработчик может изменить значение поля вызовом:

```js
BX24.placement.call('setValue', value, () => {});
```

Для команды `setValue` вторым параметром передается само значение поля. Команда записывает его в скрытое поле формы карточки. В лиде значение сохранится после сохранения карточки. В режиме просмотра обработчик может только показать интерфейс или текстовое значение.

## Подготовьте обработчик

Создайте страницу приложения с публичным адресом. Этот адрес понадобится в параметре `HANDLER` метода `userfieldtype.add`. Рекомендуем использовать HTTPS, чтобы браузер не блокировал загрузку содержимого поля.

Адрес обработчика должен использовать протокол `http` или `https` и содержать домен.

В примерах ниже используется адрес:

```text
https://your-domain.example/handler.php
```

Если выполняете JS-примеры регистрации на странице приложения, вызывайте `BX24.callMethod` после инициализации SDK методом [BX24.init](../../../sdk/bx24-js-sdk/system-functions/bx24-init.md).

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

Метод регистрирует тип с коротким кодом `phone_data`. Для создания поля в CRM понадобится полный код вида `rest_<APP_ID>_phone_data`.

## 2\. Получим идентификатор приложения

Получите идентификатор приложения методом [app.info](../../../api-reference/common/system/app-info.md). Метод не принимает параметры. В ответе понадобится поле `ID`.

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'app.info',
        {},
        (result) => {
            if (result.error())
            {
                console.error(result.error() + ': ' + result.error_description());
                return;
            }

            const applicationId = result.data().ID;
            const userTypeId = 'rest_' + applicationId + '_phone_data';

            console.info('Full user type ID: ' + userTypeId);
        }
    );
    ```

- PHP CRest

    ```php
    <?php
    require_once('crest.php');

    $result = CRest::call('app.info', []);

    if (!empty($result['error']))
    {
        echo $result['error'] . ': ' . $result['error_description'];
    }
    else
    {
        $applicationId = (int)$result['result']['ID'];
        $userTypeId = 'rest_' . $applicationId . '_phone_data';

        echo 'Full user type ID: ' . $userTypeId;
    }
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

Если `INSTALLED` имеет значение `false`, завершите установку приложения методом [BX24.installFinish](../../../sdk/bx24-js-sdk/system-functions/bx24-install-finish.md).

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
    const applicationId = 123;
    const registeredUserTypeId = 'phone_data';
    const userTypeId = 'rest_' + applicationId + '_' + registeredUserTypeId;
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

    $applicationId = 123;
    $registeredUserTypeId = 'phone_data';
    $userTypeId = 'rest_' . $applicationId . '_' . $registeredUserTypeId;
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

## 4\. Обработаем вызов поля

Когда пользователь открывает карточку лида, Битрикс24 вызывает обработчик с `PLACEMENT=USERFIELD_TYPE`. В `PLACEMENT_OPTIONS` приходят параметры пользовательского поля и идентификатор текущего лида.

Обработчик выполняет два действия:

1. Если поле пустое, получим телефон лида методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md)
2. Передадим новое значение в форму карточки командой [BX24.placement.call](../../../api-reference/widgets/ui-interaction/bx24-placement-call.md) с командой `setValue`

Для лида в `crm.item.get` укажите `entityTypeId: 1`. В параметр `id` передайте идентификатор лида из `PLACEMENT_OPTIONS.ENTITY_VALUE_ID`. Если карточка уже сохранена, `ENTITY_VALUE_ID` содержит идентификатор лида. Для новой карточки значение может быть `0`.

Если поле уже содержит значение, обработчик покажет его без повторной загрузки телефона.

Вариант PHP CRest предполагает, что [авторизация приложения для CRest](../../../first-steps/how-to-use-examples.md) уже настроена. `CRest::call` выполнит метод с правами пользователя, чей токен хранится в настройках CRest. Если там сохранен токен администратора, проверка прав `crm.item.get` будет выполнена не для пользователя, который открыл карточку лида.

{% list tabs %}

- JS

    ```html
    <!DOCTYPE html>
    <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Phone data</title>
            <script src="https://api.bitrix24.com/api/v1/"></script>
        </head>
        <body style="margin: 0; padding: 0;">
            <div id="field-content"></div>

            <script>
                BX24.init(() => {
                    const placementOptions = BX24.getPlacementOptions();

                    if (BX24.getPlacement() !== 'USERFIELD_TYPE')
                    {
                        document.getElementById('field-content').textContent =
                            'Не удалось определить тип встройки';
                        return;
                    }

                    const currentValue = placementOptions.VALUE || '';
                    const leadId = Number(placementOptions.ENTITY_VALUE_ID);

                    if (currentValue !== '')
                    {
                        renderValue(currentValue, placementOptions);
                        return;
                    }

                    if (
                        placementOptions.ENTITY_ID !== 'CRM_LEAD'
                        || !Number.isInteger(leadId)
                        || leadId <= 0
                    )
                    {
                        renderValue(currentValue, placementOptions);
                        return;
                    }

                    BX24.callMethod(
                        'crm.item.get',
                        {
                            entityTypeId: 1,
                            id: leadId,
                        },
                        (result) => {
                            if (result.error())
                            {
                                renderValue(currentValue, placementOptions);
                                console.error(
                                    result.error() + ': ' + result.error_description()
                                );
                                return;
                            }

                            const item = result.data().item;
                            const phone = (item?.fm || [])
                                .find((field) => field.typeId === 'PHONE' && field.value)
                                ?.value
                                ?.trim()
                                || item?.phone?.trim()
                                || '';
                            const value = phone
                                ? 'Lead phone: ' + phone
                                : 'Phone is empty';

                            renderValue(value, placementOptions);
                        }
                    );
                });

                function renderValue(value, placementOptions)
                {
                    const container = document.getElementById('field-content');

                    document.body.style.backgroundColor =
                        placementOptions.MODE === 'edit' ? '#fff' : '#f9fafb';

                    if (placementOptions.MODE === 'edit')
                    {
                        container.innerHTML =
                            '<input id="phone-data" type="text" style="width: 90%;" />';
                        const input = document.getElementById('phone-data');

                        input.value = value;
                        input.addEventListener('keyup', () => setValue(input.value));
                        setValue(value);
                    }
                    else
                    {
                        container.textContent = value;
                    }
                }

                function setValue(value)
                {
                    BX24.placement.call('setValue', value, () => {});
                }
            </script>
        </body>
    </html>
    ```

- PHP CRest

    ```php
    <?php
    require_once('crest.php');

    $placement = (string)($_REQUEST['PLACEMENT'] ?? '');
    $placementOptionsJson = (string)($_REQUEST['PLACEMENT_OPTIONS'] ?? '{}');
    $placementOptions = json_decode($placementOptionsJson, true);

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
        $lead = CRest::call(
            'crm.item.get',
            [
                'entityTypeId' => 1,
                'id' => (int)$placementOptions['ENTITY_VALUE_ID'],
            ]
        );

        if (!empty($lead['error']))
        {
            $errorMessage = ($lead['error'] ?? 'ERROR')
                . ': '
                . ($lead['error_description'] ?? 'Не удалось получить данные лида');
        }
        else
        {
            $item = $lead['result']['item'] ?? [];
            $phone = '';

            foreach (($item['fm'] ?? []) as $field)
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

            if ($phone === '')
            {
                $phone = trim((string)($item['phone'] ?? ''));
            }

            $value = $phone !== '' ? 'Lead phone: ' . $phone : 'Phone is empty';
        }
    }
    ?>
    <!DOCTYPE html>
    <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Phone data</title>
            <script src="https://api.bitrix24.com/api/v1/"></script>
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
                <script>
                    BX24.init(() => {
                        const input = document.getElementById('phone-data');

                        input.addEventListener('keyup', () => setValue(input.value));
                        setValue(input.value);
                    });

                    function setValue(value) {
                        BX24.placement.call('setValue', value, () => {});
                    }
                </script>
            <?php else: ?>
                <?=htmlspecialchars($value, ENT_QUOTES, 'UTF-8')?>
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
- если интерфейс поля не запускается, проверьте подключение SDK и выполнение клиентского кода внутри `BX24.init`

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
- [Инициализировать библиотеку BX24.init](../../../sdk/bx24-js-sdk/system-functions/bx24-init.md)
- [Вызвать команду интерфейса BX24.placement.call](../../../api-reference/widgets/ui-interaction/bx24-placement-call.md)
