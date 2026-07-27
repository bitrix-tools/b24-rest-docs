# Как изменить или удалить номера телефонов и email

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом создания и изменения контактов в CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Данные о контактах в CRM могут содержать несколько номеров телефонов и адресов электронной почты. Иногда нужно обновить существующие значения или удалить ненужные.

Создадим контакт с несколькими email и номерами телефонов, а потом изменим эту информацию. Для этого последовательно выполним три метода:

1. [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md) — создадим контакт в CRM,

2. [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) — получим информацию о созданном контакте,

3. [crm.contact.update](../../../api-reference/crm/contacts/crm-contact-update.md) — изменим данные о email и телефонах.

## Поля crm_multifield

Телефон и email система хранит как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield). У каждого объекта есть поля:

```javascript
{
    ID: 123, // Идентификатор существующей записи. Нужен для обновления
    TYPE_ID: "PHONE" // Тип множественного поля
    VALUE: "test@test.com", // Значение
    VALUE_TYPE: "WORK" // Тип значения
}
```

-  Для удаления значения множественного поля, передайте идентификатор `ID` и пустое значение `VALUE`. Другой вариант — укажите параметр `DELETE: 'Y'` вместо `VALUE`.

-  Для обновления значения множественного поля передайте идентификатор и новое значение.

## Пример с email

### 1. Добавляем контакт с двумя email

Для создания контакта в CRM выполним метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md). В объекте `fields` передадим поля:

-  `NAME` — имя контакта,

-  `EMAIL` — массив электронных адресов из `arNewEmail`.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для контактов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md).

{% endnote %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'
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
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import BitrixWebhook, Client

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
    ))
    ```

{% endlist %}

В результате получим идентификатор нового контакта, например, `25`.

```json
{
	"result": 25
}
```

### 2. Получаем контакт для редактирования

Чтобы получить информацию о созданном контакте, используем метод [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) с идентификатором `ID` из результата предыдущего запроса.

{% list tabs %}

- JS

    ```javascript
    // получаем информацию о контакте по ID
    const response = await $b24.actions.v2.call.make({
        method: 'crm.contact.get',
        params: { ID: contactId },
        requestId: 'contact-get'
    })
    const contactData = response.getData().result
    ```

- PHP

    ```php
    // получаем информацию о контакте по ID
    $contactData = $sb->getCRMScope()->contact()->get($contactId)->contact();
    ```

- Python

    ```python
    # получаем информацию о контакте по ID
    contact_data = client.crm.contact.get(bitrix_id=contact_id).result
    ```

{% endlist %}

В результате получим описание всех полей нового контакта.

```json
{
    "result": {
        "ID": "25",
        "NAME": "Новый контакт",
		..., // другие поля
        "EMAIL": [
            {
                "ID": "1967",
                "VALUE_TYPE": "WORK",
                "VALUE": "work_email@nomail.com",
                "TYPE_ID": "EMAIL"
            },
            {
                "ID": "1969",
                "VALUE_TYPE": "HOME",
                "VALUE": "home_email@nomail.com",
                "TYPE_ID": "EMAIL"
            }
        ]
    }
}
```

### 3. Обновляем список email

Для изменения списка email выполним метод [crm.contact.update](../../../api-reference/crm/contacts/crm-contact-update.md).

-  `ID` — идентификатор контакта,

-  `FIELDS` — массив полей, которые надо изменить. Передадим в массиве поле `EMAIL` и новые значения адресов: для первого адреса укажем новый email, а для второго — `DELETE: 'Y'`, чтобы удалить его.

{% list tabs %}

- JS

    ```javascript
    // подготавливаем массив с новой информацией о email
    const arUpdateEmail = [
        { ID: contactData.EMAIL[0].ID, VALUE: 'new_work_email@example.com' }, // меняем значение для первого email
        { ID: contactData.EMAIL[1].ID, DELETE: 'Y' } // удаляем второе значение
    ]

    // обновляем контакт
    await $b24.actions.v2.call.make({
        method: 'crm.contact.update',
        params: { ID: contactId, FIELDS: { EMAIL: arUpdateEmail } },
        requestId: 'contact-update'
    })
    ```

- PHP

    ```php
    // подготавливаем массив с новой информацией о email
    $arUpdateEmail = [
        ['ID' => $contactData->EMAIL[0]->ID, 'VALUE' => 'new_work_email@example.com'], // меняем значение для первого email
        ['ID' => $contactData->EMAIL[1]->ID, 'DELETE' => 'Y'], // удаляем второе значение
    ];

    // обновляем контакт
    $sb->getCRMScope()->contact()->update($contactId, ['EMAIL' => $arUpdateEmail]);
    ```

- Python

    ```python
    # подготавливаем массив с новой информацией о email
    ar_update_email = [
        {"ID": contact_data["EMAIL"][0]["ID"], "VALUE": "new_work_email@example.com"},  # меняем значение для первого email
        {"ID": contact_data["EMAIL"][1]["ID"], "DELETE": "Y"},  # удаляем второе значение
    ]

    # обновляем контакт
    client.crm.contact.update(bitrix_id=contact_id, fields={"EMAIL": ar_update_email})
    ```

{% endlist %}

При успешном обновлении метод вернет `true`.

```json
{
    "result": true,
}
```

### Полный пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const arNewEmail = [
        { VALUE: 'work_email@nomail.com', VALUE_TYPE: 'WORK' },
        { VALUE: 'home_email@nomail.com', VALUE_TYPE: 'HOME' }
    ]

    // Шаг 1: создаем контакт
    const newContact = await $b24.actions.v2.call.make({
        method: 'crm.contact.add',
        params: { fields: { NAME: 'Новый контакт', EMAIL: arNewEmail } },
        requestId: 'contact-add'
    })
    if (!newContact.isSuccess) {
        console.error('Ошибка создания контакта: ' + newContact.getErrorMessages().join('; '))
    } else {
        const contactId = newContact.getData().result

        // Шаг 2: получаем данные контакта
        const contactResponse = await $b24.actions.v2.call.make({
            method: 'crm.contact.get',
            params: { ID: contactId },
            requestId: 'contact-get'
        })
        const contactData = contactResponse.getData().result

        // Проверяем наличие email
        if ((contactData.EMAIL?.length ?? 0) >= 2) {
            // Шаг 3: формируем обновление email
            const arUpdateEmail = [
                { ID: contactData.EMAIL[0].ID, VALUE: 'new_work_email@example.com' },
                { ID: contactData.EMAIL[1].ID, DELETE: 'Y' }
            ]

            // обновляем контакт
            const resultContactChange = await $b24.actions.v2.call.make({
                method: 'crm.contact.update',
                params: { ID: contactId, FIELDS: { EMAIL: arUpdateEmail } },
                requestId: 'contact-update'
            })
            if (!resultContactChange.isSuccess) {
                console.error('Ошибка обновления контакта: ' + resultContactChange.getErrorMessages().join('; '))
            } else {
                console.log('Контакт успешно обновлен')
            }
        } else {
            console.warn('Не найдено достаточно email для обновления.')
        }
    }
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
    $contact = $sb->getCRMScope()->contact();

    // Формируем массив email в формате multifield
    $newEmail = [
        ['VALUE' => 'work_email@nomail.com', 'VALUE_TYPE' => 'WORK'],
        ['VALUE' => 'home_email@nomail.com', 'VALUE_TYPE' => 'HOME'],
    ];

    try {
        // Шаг 1: создаем контакт
        $contactId = $contact->add([
            'NAME' => 'Новый контакт',
            'EMAIL' => $newEmail,
        ])->getId();

        // Шаг 2: получаем данные о контакте
        $contactData = $contact->get($contactId)->contact();

        if (count($contactData->EMAIL) >= 2) {
            // Шаг 3: формируем обновление email
            $updateEmail = [
                ['ID' => $contactData->EMAIL[0]->ID, 'VALUE' => 'new_work_email@example.com'],
                ['ID' => $contactData->EMAIL[1]->ID, 'DELETE' => 'Y'], // удаляем второй email
            ];

            // обновляем контакт
            $contact->update($contactId, ['EMAIL' => $updateEmail]);
            echo 'Контакт успешно обновлен.';
        } else {
            echo 'Не найдены email для обновления.';
        }
    } catch (\Throwable $e) {
        echo 'Ошибка работы с контактом: ' . $e->getMessage();
    }
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.ru",
            webhook_token="USER_ID/TOKEN",
        )
    )

    try:
        new_contact_id = int(
            client.crm.contact.add(
                fields={
                    "NAME": "Новый контакт",
                    "EMAIL": [
                        {"VALUE": "work_email@nomail.com", "VALUE_TYPE": "WORK"},
                        {"VALUE": "home_email@nomail.com", "VALUE_TYPE": "HOME"},
                    ],
                }
            ).response.result
        )
    except BitrixAPIError as error:
        print(f"Ошибка создания контакта: {error}")
    else:
        try:
            contact_data = client.crm.contact.get(
                bitrix_id=new_contact_id,
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка получения контакта: {error}")
        else:
            if len(contact_data.get("EMAIL", [])) >= 2:
                update_email = [
                    {
                        "ID": contact_data["EMAIL"][0]["ID"],
                        "VALUE": "new_work_email@example.com",
                    },
                    {
                        "ID": contact_data["EMAIL"][1]["ID"],
                        "DELETE": "Y",
                    },
                ]

                try:
                    change_result = client.crm.contact.update(
                        bitrix_id=new_contact_id,
                        fields={"EMAIL": update_email},
                    ).response.result
                except BitrixAPIError as error:
                    print(f"Ошибка обновления контакта: {error}")
                else:
                    if change_result:
                        print("Контакт успешно обновлен.")
            else:
                print("Не найдены email для обновления.")
    ```

{% endlist %}

## Пример с телефонными номерами

Аналогично можно обновить список телефонов контакта `PHONE`.

### 1. Добавляем контакт с двумя телефонами

Для создания контакта в CRM выполним метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md). В объекте `fields` передадим поля:

-  `NAME` — имя контакта,

-  `PHONE` — массив телефонов  из `arNewPhone`.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для контактов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md).

{% endnote %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'
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
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import BitrixWebhook, Client

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
    ))
    ```

{% endlist %}

В результате получим идентификатор нового контакта, например, `25`.

```json
{
	"result": 25
}
```

### 2. Получаем контакт для редактирования

Чтобы получить информацию о созданном контакте контакте используем метод [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) с идентификатором `ID`, который получили в предыдущем запросе.

{% list tabs %}

- JS

    ```javascript
    // получаем информацию о контакте по ID
    const response = await $b24.actions.v2.call.make({
        method: 'crm.contact.get',
        params: { ID: contactId },
        requestId: 'contact-get'
    })
    const contactData = response.getData().result
    ```

- PHP

    ```php
    // получаем информацию о контакте по ID
    $contactData = $sb->getCRMScope()->contact()->get($contactId)->contact();
    ```

- Python

    ```python
    # получаем информацию о контакте по ID
    contact_data = client.crm.contact.get(bitrix_id=contact_id).result
    ```

{% endlist %}

В результате получим описание всех полей нового контакта.

```json
{
    "result": {
        "ID": "25",
        "NAME": "Новый контакт",
		..., // другие поля
        "PHONE": [
            {
                "ID": "1971",
                "VALUE_TYPE": "WORK",
                "VALUE": "89991234567",
                "TYPE_ID": "PHONE"
            },
            {
                "ID": "1973",
                "VALUE_TYPE": "HOME",
                "VALUE": "89997654321",
                "TYPE_ID": "PHONE"
            }
        ]
    }
}
```

### 3. Обновляем список телефонов

Для изменения списка email выполним метод [crm.contact.update](../../../api-reference/crm/contacts/crm-contact-update.md).

-  `ID` — идентификатор контакта,

-  `FIELDS` — массив полей, которые надо изменить. Передадим в массиве поле `PHONE` и новые значения телефонов: для первого телефона укажем новое значение, а для второго — пустое значение, чтобы удалить.

{% list tabs %}

- JS

    ```javascript
    // подготавливаем массив с новой информацией о телефонах
    const arUpdatePhone = [
        { ID: contactData.PHONE[0].ID, VALUE: '81119876541' }, // меняем значение для первого телефона
        { ID: contactData.PHONE[1].ID, VALUE: '' } // пустое значение удаляет второй телефон
    ]

    // обновляем контакт
    await $b24.actions.v2.call.make({
        method: 'crm.contact.update',
        params: { ID: contactId, FIELDS: { PHONE: arUpdatePhone } },
        requestId: 'contact-update'
    })
    ```

- PHP

    ```php
    // подготавливаем массив с новой информацией о телефонах
    $arUpdatePhone = [
        ['ID' => $contactData->PHONE[0]->ID, 'VALUE' => '81119876541'], // меняем значение для первого телефона
        ['ID' => $contactData->PHONE[1]->ID, 'VALUE' => ''], // пустое значение удаляет второй телефон
    ];

    // обновляем контакт
    $sb->getCRMScope()->contact()->update($contactId, ['PHONE' => $arUpdatePhone]);
    ```

- Python

    ```python
    # подготавливаем массив с новой информацией о телефонах
    ar_update_phone = [
        {"ID": contact_data["PHONE"][0]["ID"], "VALUE": "81119876541"},  # меняем значение для первого телефона
        {"ID": contact_data["PHONE"][1]["ID"], "VALUE": ""},  # пустое значение удаляет второй телефон
    ]

    # обновляем контакт
    client.crm.contact.update(bitrix_id=contact_id, fields={"PHONE": ar_update_phone})
    ```

{% endlist %}

При успешном обновлении метод вернет `true`.

```json
{
    "result": true,
}
```

### Полный пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const arNewPhone = [
        { VALUE: '89991234567', VALUE_TYPE: 'WORK' },
        { VALUE: '89997654321', VALUE_TYPE: 'HOME' }
    ]

    // Шаг 1: создаем контакт
    const newContact = await $b24.actions.v2.call.make({
        method: 'crm.contact.add',
        params: { fields: { NAME: 'Новый контакт', PHONE: arNewPhone } },
        requestId: 'contact-add'
    })
    if (!newContact.isSuccess) {
        console.error('Ошибка создания контакта: ' + newContact.getErrorMessages().join('; '))
    } else {
        const contactId = newContact.getData().result

        // Шаг 2: получаем данные контакта
        const contactResponse = await $b24.actions.v2.call.make({
            method: 'crm.contact.get',
            params: { ID: contactId },
            requestId: 'contact-get'
        })
        const phoneData = contactResponse.getData().result

        // Проверяем наличие телефонов
        if ((phoneData.PHONE?.length ?? 0) >= 2) {
            // Шаг 3: формируем обновление телефонов
            const arUpdatePhone = [
                { ID: phoneData.PHONE[0].ID, VALUE: '81119876541' },
                { ID: phoneData.PHONE[1].ID, VALUE: '' }
            ]

            // обновляем контакт
            const resultContactChange = await $b24.actions.v2.call.make({
                method: 'crm.contact.update',
                params: { ID: contactId, FIELDS: { PHONE: arUpdatePhone } },
                requestId: 'contact-update'
            })
            if (!resultContactChange.isSuccess) {
                console.error('Ошибка обновления контакта: ' + resultContactChange.getErrorMessages().join('; '))
            } else {
                console.log('Контакт успешно обновлен')
            }
        } else {
            console.warn('Не найдено достаточного количества телефонов.')
        }
    }
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
    $contact = $sb->getCRMScope()->contact();

    // Формируем массив телефонов в формате multifield
    $newPhone = [
        ['VALUE' => '89991234567', 'VALUE_TYPE' => 'WORK'],
        ['VALUE' => '89997654321', 'VALUE_TYPE' => 'HOME'],
    ];

    try {
        // Шаг 1: создаем контакт
        $contactId = $contact->add([
            'NAME' => 'Новый контакт',
            'PHONE' => $newPhone,
        ])->getId();

        // Шаг 2: получаем данные о контакте
        $contactData = $contact->get($contactId)->contact();

        if (count($contactData->PHONE) >= 2) {
            // Шаг 3: формируем обновление телефонов
            $updatePhone = [
                ['ID' => $contactData->PHONE[0]->ID, 'VALUE' => '81119876541'],
                ['ID' => $contactData->PHONE[1]->ID, 'VALUE' => ''], // пустое значение удаляет второй телефон
            ];

            // обновляем контакт
            $contact->update($contactId, ['PHONE' => $updatePhone]);
            echo 'Контакт успешно обновлен.';
        } else {
            echo 'Не найдены телефоны для обновления.';
        }
    } catch (\Throwable $e) {
        echo 'Ошибка работы с контактом: ' . $e->getMessage();
    }
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.ru",
            webhook_token="USER_ID/TOKEN",
        )
    )

    try:
        contact_id = int(
            client.crm.contact.add(
                fields={
                    "NAME": "Новый контакт",
                    "PHONE": [
                        {"VALUE": "89991234567", "VALUE_TYPE": "WORK"},
                        {"VALUE": "89997654321", "VALUE_TYPE": "HOME"},
                    ],
                }
            ).response.result
        )
    except BitrixAPIError as error:
        print(f"Ошибка создания контакта: {error}")
    else:
        try:
            contact = client.crm.contact.get(bitrix_id=contact_id).response.result
        except BitrixAPIError as error:
            print(f"Ошибка получения контакта: {error}")
        else:
            values = contact.get("PHONE") or []

            if len(values) >= 2:
                updated_values = [
                    {"ID": values[0]["ID"], "VALUE": "81119876541"},
                    {"ID": values[1]["ID"], "VALUE": ""},
                ]
                try:
                    change_result = client.crm.contact.update(
                        bitrix_id=contact_id,
                        fields={"PHONE": updated_values},
                    ).response.result
                except BitrixAPIError as error:
                    print(f"Ошибка обновления контакта: {error}")
                else:
                    if change_result:
                        print("Контакт успешно обновлен.")
            else:
                print("Не найдены телефоны для обновления.")
    ```

{% endlist %}
