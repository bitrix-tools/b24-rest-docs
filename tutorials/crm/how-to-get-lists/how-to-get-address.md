# Как получить адрес клиента из CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы:
>
> - [crm.requisite.list](../../../api-reference/crm/requisites/universal/crm-requisite-list.md) — пользователь с правом на чтение контактов или компаний
> - [crm.address.list](../../../api-reference/crm/requisites/addresses/crm-address-list.md) — пользователь с правом на чтение контактов, компаний и лидов одновременно
> - [crm.contact.userfield.list](../../../api-reference/crm/contacts/userfield/crm-contact-userfield-list.md) — администратор
> - [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) — пользователь с правом на чтение контакта

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Адрес клиента хранится в Битрикс24 двумя независимыми способами.

- В [реквизитах](../../../api-reference/crm/requisites/index.md) контактов и компаний. Это штатный способ. В карточке клиента адрес выводится отдельным полем реквизита. У одного клиента может быть несколько реквизитов, а внутри одного реквизита — несколько адресов разных типов. У лида реквизитов нет. Его адрес привязан к самому лиду
- В пользовательском поле типа `address`. Такое поле администратор создает отдельно для нужного типа объекта CRM, значение хранится строкой в самом объекте

Способы не связаны между собой. Адрес из реквизитов не попадает в пользовательское поле, а адрес из пользовательского поля не виден методам `crm.address.*`. Если неизвестно, где заполнен адрес у конкретного клиента, проверьте оба способа.

В туториале разберем оба. Основной сценарий — адрес из реквизитов, он состоит из двух шагов.

1. Получим идентификаторы реквизитов клиента методом [crm.requisite.list](../../../api-reference/crm/requisites/universal/crm-requisite-list.md)
2. Получим адреса этих реквизитов методом [crm.address.list](../../../api-reference/crm/requisites/addresses/crm-address-list.md)

Второй способ описан в разделе [Адрес из пользовательского поля](#userfield).

## Подготовим данные

Для сценария нужны:

- входящий вебхук с правом `crm` — примеры используют его для авторизации. Храните адрес вебхука в переменной окружения, а не в коде
- идентификатор клиента. В примерах используется контакт с `ID` `2429`. Получить идентификатор можно методом [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md) с фильтром по любому известному полю контакта, для компании — методом [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md). Если известны только телефон или почта, используйте туториал [«Поиск дубликатов по номеру телефона»](./search-by-phone-and-email.md)

## 1. Получим реквизиты, связанные с контактом

Адрес не привязан к контакту или компании напрямую — он привязан к реквизиту. Поэтому сначала получим идентификаторы реквизитов клиента.

Для этого используем метод [crm.requisite.list](../../../api-reference/crm/requisites/universal/crm-requisite-list.md) с фильтром:

- в `ENTITY_TYPE_ID` укажем значение `3` — идентификатор для [типа контакт](../../../api-reference/crm/data-types.md#object_type). Для типа компании используйте идентификатор `4`
- в `ENTITY_ID` — идентификатор контакта, в примере `2429`

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Примеры шагов продолжают друг друга. SDK инициализируется один раз здесь, дальше используется уже готовый экземпляр.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const result = await $b24.actions.v2.call.make({
        method: 'crm.requisite.list',
        params: {
            filter: {
                ENTITY_TYPE_ID: 3,
                ENTITY_ID: 2429,
            },
            select: [
                'ID',
                'ENTITY_TYPE_ID',
                'ENTITY_ID',
            ],
        }
    });
    ```

- PHP

    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    $requisites = $sb->getCRMScope()->requisite()->list(
        [],
        [
            'ENTITY_TYPE_ID' => 3,
            'ENTITY_ID' => 2429,
        ],
        [
            'ID',
            'ENTITY_TYPE_ID',
            'ENTITY_ID',
        ]
    )->getRequisites();

    print_r($requisites);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain=os.environ["B24_DOMAIN"],
            webhook_token=os.environ["B24_WEBHOOK_TOKEN"],
        )
    )
    # B24_DOMAIN = 'your-domain.bitrix24.com'
    # B24_WEBHOOK_TOKEN = 'user_id/webhook_key'

    result = client.crm.requisite.list(
        filter={
            "ENTITY_TYPE_ID": 3,
            "ENTITY_ID": 2429,
        },
        select=[
            "ID",
            "ENTITY_TYPE_ID",
            "ENTITY_ID",
        ],
    ).response.result
    ```

{% endlist %}

В ответе получим список реквизитов контакта. В примере реквизит один, его `ID` — `361`. Именно это значение понадобится следующему запросу.

```json
{
    "result": [
        {
            "ID": "361",
            "ENTITY_TYPE_ID": "3",
            "ENTITY_ID": "2429"
        }
    ],
    "total": 1
}
```

Если в ответе несколько реквизитов, адреса нужно запросить для каждого `ID` из `result`.

## 2. Получим адреса реквизита

Для получения адресов используем метод [crm.address.list](../../../api-reference/crm/requisites/addresses/crm-address-list.md) с фильтром:

- в `ENTITY_TYPE_ID` укажем значение `8` — идентификатор для [типа реквизит](../../../api-reference/crm/data-types.md#object_type)
- в `ENTITY_ID` — идентификатор реквизита из шага 1, в примере `361`

Без фильтра по типу метод вернет все адреса реквизита. Так и получим полный список адресов клиента.

Адрес лида получают этим же методом, но без шага 1. В `ENTITY_TYPE_ID` укажите `1` — идентификатор типа лид, в `ENTITY_ID` — идентификатор самого лида.

{% list tabs %}

- JS

    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.address.list',
        params: {
            filter: {
                ENTITY_TYPE_ID: 8,
                ENTITY_ID: 361,
            },
        }
    });
    ```

- PHP

    ```php
    $addresses = $sb->getCRMScope()->address()->list(
        [],
        [
            'ENTITY_TYPE_ID' => 8,
            'ENTITY_ID' => 361,
        ],
        []
    )->getAddresses();

    print_r($addresses);
    ```

- Python

    ```python
    result = client.crm.address.list(
        filter={
            "ENTITY_TYPE_ID": 8,
            "ENTITY_ID": 361,
        }
    ).response.result
    ```

{% endlist %}

В ответе получим все адреса реквизита. В примере их два — фактический адрес и адрес доставки.

```json
{
    "result": [
        {
            "TYPE_ID": "1",
            "ENTITY_TYPE_ID": "8",
            "ENTITY_ID": "361",
            "ADDRESS_1": "Тверская улица, 7",
            "ADDRESS_2": null,
            "CITY": "Москва",
            "POSTAL_CODE": "125009",
            "REGION": null,
            "PROVINCE": "Москва",
            "COUNTRY": "Россия",
            "COUNTRY_CODE": null,
            "LOC_ADDR_ID": "569",
            "ANCHOR_TYPE_ID": "3",
            "ANCHOR_ID": "2429"
        },
        {
            "TYPE_ID": "11",
            "ENTITY_TYPE_ID": "8",
            "ENTITY_ID": "361",
            "ADDRESS_1": "Гранатный переулок, 10",
            "ADDRESS_2": null,
            "CITY": "Москва",
            "POSTAL_CODE": "123001",
            "REGION": "Пресненский район",
            "PROVINCE": "Москва",
            "COUNTRY": "Россия",
            "COUNTRY_CODE": null,
            "LOC_ADDR_ID": "571",
            "ANCHOR_TYPE_ID": "3",
            "ANCHOR_ID": "2429"
        }
    ],
    "total": 2
}
```

Ключевые поля ответа:

- `TYPE_ID` — [тип адреса](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md). В примере `1` — фактический адрес, `11` — адрес доставки. Полный список типов вернет метод [crm.enum.addresstype](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md)
- `ADDRESS_1`, `ADDRESS_2`, `CITY`, `POSTAL_CODE`, `REGION`, `PROVINCE`, `COUNTRY` — составные части адреса. Собирать строку адреса нужно из них, отдельного поля с готовой строкой у метода нет. Незаполненные части приходят как `null`, это нормально даже для заполненного адреса
- `ANCHOR_TYPE_ID` и `ANCHOR_ID` — тип и идентификатор клиента, которому принадлежит реквизит. В примере `3` и `2429` — это исходный контакт. По этой паре проверяют, что адрес относится к нужному клиенту

Чтобы получить адрес только одного типа, добавьте в фильтр `TYPE_ID`. Например, для адреса доставки:

{% list tabs %}

- JS

    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.address.list',
        params: {
            filter: {
                ENTITY_TYPE_ID: 8,
                ENTITY_ID: 361,
                TYPE_ID: 11,
            },
        }
    });
    ```

- PHP

    ```php
    $addresses = $sb->getCRMScope()->address()->list(
        [],
        [
            'ENTITY_TYPE_ID' => 8,
            'ENTITY_ID' => 361,
            'TYPE_ID' => 11,
        ],
        []
    )->getAddresses();

    print_r($addresses);
    ```

- Python

    ```python
    result = client.crm.address.list(
        filter={
            "ENTITY_TYPE_ID": 8,
            "ENTITY_ID": 361,
            "TYPE_ID": 11,
        }
    ).response.result
    ```

{% endlist %}

## Пример кода

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    // Идентификатор клиента, получить его можно методом crm.contact.list
    const contactId = 2429;
    // Тип объекта CRM: 3 — контакт, 4 — компания
    const entityTypeId = 3;
    // Тип адреса из crm.enum.addresstype, например 11 — адрес доставки.
    // Оставьте null, чтобы получить все адреса клиента
    const addressTypeId = null;

    // Получаем идентификаторы реквизитов клиента
    const requisiteResult = await $b24.actions.v2.call.make({
        method: 'crm.requisite.list',
        params: {
            filter: {
                ENTITY_TYPE_ID: entityTypeId,
                ENTITY_ID: contactId
            },
            select: ["ID"]
        }
    });

    if (!requisiteResult.isSuccess) {
        console.error(requisiteResult.getErrorMessages().join('; '));
    } else {
        const requisites = requisiteResult.getData().result;

        if (requisites.length === 0) {
            console.log("У клиента нет реквизитов, адрес хранить негде.");
        } else {
            const rows = [];

            // У клиента может быть несколько реквизитов, обходим каждый
            for (const requisite of requisites) {
                const filter = {
                    ENTITY_TYPE_ID: 8,
                    ENTITY_ID: requisite.ID
                };

                if (addressTypeId !== null) {
                    filter.TYPE_ID = addressTypeId;
                }

                const addressResult = await $b24.actions.v2.call.make({
                    method: 'crm.address.list',
                    params: { filter: filter }
                });

                if (!addressResult.isSuccess) {
                    console.error(addressResult.getErrorMessages().join('; '));
                    continue;
                }

                for (const address of addressResult.getData().result) {
                    rows.push({
                        "Реквизит": requisite.ID,
                        "Тип адреса": address.TYPE_ID,
                        "Адрес": address.ADDRESS_1 || "Не указано",
                        "Город": address.CITY || "Не указано",
                        "Индекс": address.POSTAL_CODE || "Не указано",
                        "Страна": address.COUNTRY || "Не указано"
                    });
                }
            }

            if (rows.length === 0) {
                console.log("У реквизитов клиента нет адресов.");
            } else {
                console.table(rows);
            }
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
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    // Идентификатор клиента, получить его можно методом crm.contact.list
    $contactId = 2429;
    // Тип объекта CRM: 3 — контакт, 4 — компания
    $entityTypeId = 3;
    // Тип адреса из crm.enum.addresstype, например 11 — адрес доставки.
    // Оставьте null, чтобы получить все адреса клиента
    $addressTypeId = null;

    try {
        // Получаем идентификаторы реквизитов клиента
        $requisites = $sb->getCRMScope()->requisite()->list(
            [],
            [
                'ENTITY_TYPE_ID' => $entityTypeId,
                'ENTITY_ID' => $contactId
            ],
            ['ID']
        )->getRequisites();

        if (count($requisites) === 0) {
            echo 'У клиента нет реквизитов, адрес хранить негде.';
            return;
        }

        $rows = [];

        // У клиента может быть несколько реквизитов, обходим каждый
        foreach ($requisites as $requisite) {
            $filter = [
                'ENTITY_TYPE_ID' => 8,
                'ENTITY_ID' => $requisite->ID
            ];

            if ($addressTypeId !== null) {
                $filter['TYPE_ID'] = $addressTypeId;
            }

            $addresses = $sb->getCRMScope()->address()->list(
                [],
                $filter,
                []
            )->getAddresses();

            foreach ($addresses as $address) {
                $rows[] = [
                    'requisiteId' => $requisite->ID,
                    'typeId' => $address->TYPE_ID,
                    'address' => $address->ADDRESS_1 ?? 'Не указано',
                    'city' => $address->CITY ?? 'Не указано',
                    'postalCode' => $address->POSTAL_CODE ?? 'Не указано',
                    'country' => $address->COUNTRY ?? 'Не указано'
                ];
            }
        }

        if (count($rows) === 0) {
            echo 'У реквизитов клиента нет адресов.';
            return;
        }

        echo '<table border="1">';
        echo '<tr><th>Реквизит</th><th>Тип адреса</th><th>Адрес</th><th>Город</th><th>Индекс</th><th>Страна</th></tr>';
        foreach ($rows as $row) {
            echo '<tr>';
            foreach ($row as $value) {
                echo '<td>' . htmlspecialchars((string)$value) . '</td>';
            }
            echo '</tr>';
        }
        echo '</table>';
    } catch (\Throwable $e) {
        echo 'Error: ' . $e->getMessage();
    }
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain=os.environ["B24_DOMAIN"],
            webhook_token=os.environ["B24_WEBHOOK_TOKEN"],
        )
    )
    # B24_DOMAIN = 'your-domain.bitrix24.com'
    # B24_WEBHOOK_TOKEN = 'user_id/webhook_key'

    # Идентификатор клиента, получить его можно методом crm.contact.list
    contact_id = 2429
    # Тип объекта CRM: 3 — контакт, 4 — компания
    entity_type_id = 3
    # Тип адреса из crm.enum.addresstype, например 11 — адрес доставки.
    # Оставьте None, чтобы получить все адреса клиента
    address_type_id = None

    try:
        requisites = client.crm.requisite.list(
            filter={
                "ENTITY_TYPE_ID": entity_type_id,
                "ENTITY_ID": contact_id,
            },
            select=["ID"],
        ).response.result
    except BitrixAPIError as error:
        print(f"Ошибка: {error}")
    else:
        if not requisites:
            print("У клиента нет реквизитов, адрес хранить негде.")
        else:
            rows = []

            # У клиента может быть несколько реквизитов, обходим каждый
            for requisite in requisites:
                address_filter = {
                    "ENTITY_TYPE_ID": 8,
                    "ENTITY_ID": requisite["ID"],
                }

                if address_type_id is not None:
                    address_filter["TYPE_ID"] = address_type_id

                try:
                    addresses = client.crm.address.list(
                        filter=address_filter,
                    ).response.result
                except BitrixAPIError as error:
                    print(f"Ошибка: {error}")
                    continue

                for address in addresses:
                    rows.append(
                        [
                            str(requisite["ID"]),
                            str(address.get("TYPE_ID") or "Не указано"),
                            str(address.get("ADDRESS_1") or "Не указано"),
                            str(address.get("CITY") or "Не указано"),
                            str(address.get("POSTAL_CODE") or "Не указано"),
                            str(address.get("COUNTRY") or "Не указано"),
                        ]
                    )

            if not rows:
                print("У реквизитов клиента нет адресов.")
            else:
                print("Реквизит\tТип адреса\tАдрес\tГород\tИндекс\tСтрана")
                for row in rows:
                    print("\t".join(row))
    ```

{% endlist %}

## Адрес из пользовательского поля {#userfield}

Если администратор Битрикс24 создал для контакта пользовательское поле типа `address`, адрес хранится прямо в контакте и методам `crm.address.*` не виден. Такой адрес получают в два шага.

1. Узнаем код поля методом [crm.contact.userfield.list](../../../api-reference/crm/contacts/userfield/crm-contact-userfield-list.md) с фильтром `USER_TYPE_ID` = `address`. Метод доступен только администратору
2. Прочитаем значение поля методом [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) — он возвращает пользовательские поля вместе со стандартными

Для компании используйте [crm.company.userfield.list](../../../api-reference/crm/companies/userfields/crm-company-userfield-list.md) и [crm.company.get](../../../api-reference/crm/companies/crm-company-get.md), для лида — [crm.lead.userfield.list](../../../api-reference/crm/leads/userfield/crm-lead-userfield-list.md) и [crm.lead.get](../../../api-reference/crm/leads/crm-lead-get.md).

{% list tabs %}

- JS

    ```javascript
    // 1. Ищем пользовательские поля типа «адрес»
    const fieldsResult = await $b24.actions.v2.call.make({
        method: 'crm.contact.userfield.list',
        params: {
            filter: { USER_TYPE_ID: 'address' }
        }
    });

    if (!fieldsResult.isSuccess) {
        // Метод доступен только администратору
        console.error(fieldsResult.getErrorMessages().join('; '));
    } else {
        const addressFields = fieldsResult.getData().result;

        // 2. Читаем значения этих полей у контакта
        const contactResult = await $b24.actions.v2.call.make({
            method: 'crm.contact.get',
            params: { id: 2429 }
        });

        if (!contactResult.isSuccess) {
            console.error(contactResult.getErrorMessages().join('; '));
        } else {
            const contact = contactResult.getData().result;

            for (const field of addressFields) {
                console.log(field.FIELD_NAME, contact[field.FIELD_NAME]);
            }
        }
    }
    ```

- PHP

    ```php
    // У B24PhpSDK нет типизированной обертки для crm.contact.userfield.list,
    // поэтому вызываем метод через ядро SDK
    try {
        $fields = $sb->core->call(
            'crm.contact.userfield.list',
            [
                'filter' => ['USER_TYPE_ID' => 'address']
            ]
        )->getResponseData()->getResult();

        $contact = $sb->core->call(
            'crm.contact.get',
            ['id' => 2429]
        )->getResponseData()->getResult();

        foreach ($fields as $field) {
            echo $field['FIELD_NAME'] . ': ' . print_r($contact[$field['FIELD_NAME']] ?? null, true) . PHP_EOL;
        }
    } catch (\Throwable $e) {
        // crm.contact.userfield.list доступен только администратору
        echo 'Error: ' . $e->getMessage();
    }
    ```

- Python

    ```python
    try:
        fields = client.crm.contact.userfield.list(
            filter={"USER_TYPE_ID": "address"},
        ).response.result

        contact = client.crm.contact.get(bitrix_id=2429).response.result
    except BitrixAPIError as error:
        # crm.contact.userfield.list доступен только администратору
        print(f"Ошибка: {error}")
    else:
        for field in fields:
            print(field["FIELD_NAME"], contact.get(field["FIELD_NAME"]))
    ```

{% endlist %}

В ответе первого запроса нас интересует `FIELD_NAME` — код поля, по которому значение лежит в контакте. Обратите внимание на `MULTIPLE`: от него зависит формат значения.

```json
{
    "result": [
        {
            "ID": "474",
            "ENTITY_ID": "CRM_CONTACT",
            "FIELD_NAME": "UF_CRM_1724412832",
            "USER_TYPE_ID": "address",
            "MULTIPLE": "N",
            "MANDATORY": "N"
        },
        {
            "ID": "475",
            "ENTITY_ID": "CRM_CONTACT",
            "FIELD_NAME": "UF_CRM_1724412960",
            "USER_TYPE_ID": "address",
            "MULTIPLE": "Y",
            "MANDATORY": "N"
        }
    ],
    "total": 2
}
```

Значение такого поля — строка из трех частей, разделенных символом `|`: текстовый адрес, координаты через `;` и идентификатор адреса в модуле `location`. Если `MULTIPLE` = `Y`, придет массив таких строк.

```json
{
    "result": {
        "ID": "2429",
        "UF_CRM_1724412832": "Гранатный переулок, 10, Москва, Москва, Россия, 123001|55.761234;37.591234|571",
        "UF_CRM_1724412960": [
            "Тверская улица, 7, , Москва, Москва, Россия|;|575",
            ", , Москва, Москва, Россия|;|577"
        ]
    }
}
```

Текстовая часть собирается из тех же составляющих, что и адрес реквизита, поэтому незаполненные составляющие дают подряд идущие запятые. Координаты тоже могут быть пустыми — тогда остается один разделитель `;`. Разбирайте строку по `|` и не рассчитывайте, что все три части заполнены.

## Проверим результат

Сценарий выполнен верно, если:

- в ответе `crm.requisite.list` поле `total` больше нуля и в `result` есть хотя бы один `ID`
- в ответе `crm.address.list` поле `total` больше нуля
- в каждом адресе `ANCHOR_TYPE_ID` и `ANCHOR_ID` совпадают с типом и идентификатором исходного клиента — в примере `3` и `2429`

Не считайте признаком ошибки `null` в отдельных полях адреса: незаполненные составляющие приходят пустыми и у корректно заведенного адреса.

Сверить данные можно в интерфейсе. Откройте карточку контакта или компании и раскройте поле «Реквизиты». Адреса из ответа метода должны совпадать с адресами в реквизитах карточки. Адрес из пользовательского поля отображается в карточке отдельным полем, а не внутри реквизитов.

## Ошибки и диагностика

Если метод вернул ошибку или пустой результат, проверьте данные запроса.

- `Access denied.` в `crm.requisite.list` — у пользователя нет прав на чтение объекта, указанного в `ENTITY_TYPE_ID`. Проверьте права на чтение контактов и компаний в настройках CRM
- `Access denied.` в `crm.requisite.list` со значением `ENTITY_TYPE_ID` `1` — реквизиты есть только у контактов и компаний, для лида шаг 1 пропускают
- `Access denied.` в `crm.address.list` — метод требует прав на чтение контактов, компаний и лидов одновременно. Ошибка появится, даже когда конкретный реквизит читать можно
- `Access denied.` в `crm.contact.userfield.list` — метод вызван не под администратором. Это не значит, что адреса нет — код поля получают под администратором один раз, дальше `crm.contact.get` администратора не требует
- `result` пуст в `crm.requisite.list` — у клиента нет реквизитов, проверьте пользовательское поле. Убедитесь также, что `ENTITY_TYPE_ID` соответствует объекту из `ENTITY_ID`. С типом `3` и идентификатором компании метод вернет пустой список без ошибки
- `result` пуст в `crm.address.list` — у реквизита нет адресов либо адреса есть, но другого типа. Повторите шаг 2 без фильтра `TYPE_ID` и проверьте, что в `ENTITY_TYPE_ID` передан `8`, а в `ENTITY_ID` идентификатор реквизита из шага 1, а не идентификатор контакта

## Что важно учитывать

- Адрес привязан к реквизиту, а не к контакту или компании напрямую. Реквизитов у одного клиента может быть несколько, поэтому обходите весь список из шага 1, а не только первый элемент
- Внутри одного реквизита может быть несколько адресов разных типов. Без фильтра `TYPE_ID` метод вернет их все
- Готовой строки адреса метод не возвращает. Собирайте ее из полей `ADDRESS_1`, `ADDRESS_2`, `CITY`, `POSTAL_CODE`, `REGION`, `PROVINCE`, `COUNTRY`
- Поле `COUNTRY_CODE` оставлено для обратной совместимости и не заполняется
- Поля `ANCHOR_TYPE_ID` и `ANCHOR_ID` служебные, они заполняются автоматически при добавлении адреса
- Привязать адрес напрямую к контакту или компании, минуя реквизит, можно только там, где старый режим работы с адресами включала техподдержка. Не рассчитывайте на эту связь в новых интеграциях
- Два способа хранения не синхронизируются между собой. Если адрес заведен в пользовательском поле, в реквизитах его не будет

## Продолжите изучение

- [{#T}](../../../api-reference/crm/requisites/index.md)
- [{#T}](../../../api-reference/crm/requisites/addresses/crm-address-list.md)
- [{#T}](../../../api-reference/crm/requisites/universal/crm-requisite-list.md)
- [{#T}](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md)
- [{#T}](./search-by-phone-and-email.md)
