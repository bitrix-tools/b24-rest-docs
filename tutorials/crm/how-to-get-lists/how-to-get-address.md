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

- Go

    ```go
    // Адрес привязан не к контакту, а к его РЕКВИЗИТУ, поэтому сначала нужны
    // идентификаторы реквизитов.
    res, err := core.Call(ctx, "crm.requisite.list", b24.Params{
    	"filter": b24.Params{"ENTITY_TYPE_ID": typeContact, "ENTITY_ID": contactID},
    	"select": []string{"ID", "ENTITY_TYPE_ID", "ENTITY_ID"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.requisite.list: %w", err)
    }

    // Идентификаторы здесь приходят СТРОКАМИ ("361"), хотя crm.enum.* отдаёт их
    // числами. b24.ID разбирает оба написания, обычный int — нет.
    var requisites []struct {
    	ID b24.ID `json:"ID"`
    }
    if err := json.Unmarshal(res.Result, &requisites); err != nil {
    	return fmt.Errorf("разбор реквизитов: %w", err)
    }
    if len(requisites) == 0 {
    	return fmt.Errorf("у контакта %d нет реквизитов, адрес хранить негде", contactID)
    }
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

- Go

    ```go
    // Без фильтра по типу метод вернёт все адреса реквизита.
    res, err := core.Call(ctx, "crm.address.list", b24.Params{
    	"filter": b24.Params{"ENTITY_TYPE_ID": typeRequisite, "ENTITY_ID": r.ID},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.address.list: %w", err)
    }

    var addresses []address
    if err := json.Unmarshal(res.Result, &addresses); err != nil {
    	return fmt.Errorf("разбор адресов: %w", err)
    }
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

- Go

    ```go
    res, err = core.Call(ctx, "crm.address.list", b24.Params{
    	"filter": b24.Params{
    		"ENTITY_TYPE_ID": typeRequisite,
    		"ENTITY_ID":      r.ID,
    		"TYPE_ID":        11, // 11 — адрес доставки
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.address.list по типу: %w", err)
    }
    var delivery []address
    if err := json.Unmarshal(res.Result, &delivery); err != nil {
    	return fmt.Errorf("разбор адресов доставки: %w", err)
    }
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

- Go

    ```go
    // Подготовка в пустом каталоге — go get без go mod init не сработает:
    //
    //	go mod init example && go get github.com/bitrix24/b24gosdk
    //
    // Запуск:
    //
    //	export B24_WEBHOOK_URL='https://ваш-портал.bitrix24.ru/rest/1/токен/' && go run .
    //
    // Пример самодостаточный: он создаёт контакт с реквизитом и двумя адресами,
    // находит адреса так, как описывает страница, и убирает за собой. Запускается
    // на любом портале, ничего править не нужно.
    package main

    import (
    	"context"
    	"encoding/json"
    	"fmt"
    	"log"
    	"os"

    	b24 "github.com/bitrix24/b24gosdk"
    )

    // Идентификаторы типов объектов CRM: полный перечень отдаёт crm.enum.ownertype.
    const (
    	typeContact   = 3 // контакт; компания — 4
    	typeRequisite = 8 // реквизит
    )

    func main() {
    	if err := run(context.Background()); err != nil {
    		log.Fatal(err)
    	}
    }

    func run(ctx context.Context) error {
    	// Путь вебхука — это секрет, поэтому он приходит из окружения, а не из кода.
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    	// --- подготовка: контакт, его реквизит и два адреса

    	contactID, err := createClient(ctx, core)
    	if err != nil {
    		return err
    	}
    	// Удаление контакта уносит с собой и его реквизиты, и адреса реквизитов.
    	defer del(ctx, core, "crm.contact.delete", b24.Params{"id": contactID})

    	// --- шаг 1: реквизиты клиента
    	// Адрес привязан не к контакту, а к его РЕКВИЗИТУ, поэтому сначала нужны
    	// идентификаторы реквизитов.
    	res, err := core.Call(ctx, "crm.requisite.list", b24.Params{
    		"filter": b24.Params{"ENTITY_TYPE_ID": typeContact, "ENTITY_ID": contactID},
    		"select": []string{"ID", "ENTITY_TYPE_ID", "ENTITY_ID"},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.requisite.list: %w", err)
    	}

    	// Идентификаторы здесь приходят СТРОКАМИ ("361"), хотя crm.enum.* отдаёт их
    	// числами. b24.ID разбирает оба написания, обычный int — нет.
    	var requisites []struct {
    		ID b24.ID `json:"ID"`
    	}
    	if err := json.Unmarshal(res.Result, &requisites); err != nil {
    		return fmt.Errorf("разбор реквизитов: %w", err)
    	}
    	if len(requisites) == 0 {
    		return fmt.Errorf("у контакта %d нет реквизитов, адрес хранить негде", contactID)
    	}
    	fmt.Printf("у контакта %d реквизитов: %d\n", contactID, len(requisites))

    	// --- шаг 2: адреса каждого реквизита

    	for _, r := range requisites {
    		// Без фильтра по типу метод вернёт все адреса реквизита.
    		res, err := core.Call(ctx, "crm.address.list", b24.Params{
    			"filter": b24.Params{"ENTITY_TYPE_ID": typeRequisite, "ENTITY_ID": r.ID},
    		}, b24.WithIdempotent())
    		if err != nil {
    			return fmt.Errorf("crm.address.list: %w", err)
    		}

    		var addresses []address
    		if err := json.Unmarshal(res.Result, &addresses); err != nil {
    			return fmt.Errorf("разбор адресов: %w", err)
    		}
    		for _, a := range addresses {
    			fmt.Printf("  реквизит %d, тип %d: %s\n", r.ID, a.TypeID, a.String())
    		}

    		// Чтобы получить адрес только одного типа, добавьте в фильтр TYPE_ID.
    		res, err = core.Call(ctx, "crm.address.list", b24.Params{
    			"filter": b24.Params{
    				"ENTITY_TYPE_ID": typeRequisite,
    				"ENTITY_ID":      r.ID,
    				"TYPE_ID":        11, // 11 — адрес доставки
    			},
    		}, b24.WithIdempotent())
    		if err != nil {
    			return fmt.Errorf("crm.address.list по типу: %w", err)
    		}
    		var delivery []address
    		if err := json.Unmarshal(res.Result, &delivery); err != nil {
    			return fmt.Errorf("разбор адресов доставки: %w", err)
    		}
    		fmt.Printf("  из них адресов доставки: %d\n", len(delivery))
    	}

    	// --- второй способ хранения: пользовательское поле типа address

    	return userFieldAddresses(ctx, core, contactID)
    }

    // address — одна строка ответа crm.address.list. Готовой строки адреса у метода
    // нет: её собирают из частей, и незаполненные части приходят как null — это
    // нормально даже у заполненного адреса.
    type address struct {
    	TypeID     b24.ID `json:"TYPE_ID"`
    	Address1   string `json:"ADDRESS_1"`
    	City       string `json:"CITY"`
    	PostalCode string `json:"POSTAL_CODE"`
    	Country    string `json:"COUNTRY"`
    	// По этой паре проверяют, что адрес относится к нужному клиенту.
    	AnchorTypeID b24.ID `json:"ANCHOR_TYPE_ID"`
    	AnchorID     b24.ID `json:"ANCHOR_ID"`
    }

    func (a address) String() string {
    	out := ""
    	for _, part := range []string{a.PostalCode, a.Country, a.City, a.Address1} {
    		if part == "" {
    			continue
    		}
    		if out != "" {
    			out += ", "
    		}
    		out += part
    	}
    	if out == "" {
    		return "не указан"
    	}
    	return out
    }

    // userFieldAddresses читает адрес, который лежит не в реквизите, а прямо в
    // контакте — в пользовательском поле типа address. Методам crm.address.* такой
    // адрес не виден, это независимый способ хранения.
    func userFieldAddresses(ctx context.Context, core *b24.Core, contactID b24.ID) error {
    	res, err := core.Call(ctx, "crm.contact.userfield.list", b24.Params{
    		"filter": b24.Params{"USER_TYPE_ID": "address"},
    	}, b24.WithIdempotent())
    	if err != nil {
    		// Метод доступен только администратору — это не повод обрывать сценарий
    		// с адресами из реквизитов, он уже отработал.
    		fmt.Fprintf(os.Stderr, "crm.contact.userfield.list: %v\n", err)
    		return nil
    	}
    	var fields []struct {
    		FieldName string `json:"FIELD_NAME"`
    		Multiple  string `json:"MULTIPLE"`
    	}
    	if err := json.Unmarshal(res.Result, &fields); err != nil {
    		return fmt.Errorf("разбор пользовательских полей: %w", err)
    	}

    	res, err = core.Call(ctx, "crm.contact.get",
    		b24.Params{"id": contactID}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.contact.get: %w", err)
    	}
    	for _, f := range fields {
    		// От MULTIPLE зависит форма значения: у множественного поля это массив.
    		raw, ok := b24.Unwrap(res.Result, f.FieldName)
    		if !ok || b24.IsEmpty(raw) {
    			fmt.Printf("  поле %s (MULTIPLE=%s): не заполнено\n", f.FieldName, f.Multiple)
    			continue
    		}
    		fmt.Printf("  поле %s (MULTIPLE=%s): %s\n", f.FieldName, f.Multiple, raw)
    	}
    	if len(fields) == 0 {
    		fmt.Println("  полей типа address у контактов на этом портале нет")
    	}
    	return nil
    }

    // --- вспомогательное: подготовка данных и уборка

    // createClient создаёт контакт, его реквизит и два адреса ОДНИМ связанным
    // батчем: 4 команды стоят одного обращения к порталу вместо четырёх.
    func createClient(ctx context.Context, core *b24.Core) (b24.ID, error) {
    	presetID, err := firstPreset(ctx, core)
    	if err != nil {
    		return 0, err
    	}

    	b := b24.NewBatch()
    	// Связанному батчу Halt ОБЯЗАТЕЛЕН. Без него упавший производитель — не
    	// ошибка для сервера: он подставит потребителю текст самого плейсхолдера
    	// как значение, и реквизит привяжется к «контакту» по имени "$result[...]".
    	b.Halt = true

    	if err := b.AddAs("contact", "crm.contact.add", b24.Params{
    		"fields": b24.Params{"NAME": "Иван", "LAST_NAME": "Петров"},
    	}); err != nil {
    		return 0, err
    	}
    	// Пути нет: crm.contact.add отвечает голым идентификатором.
    	contactRef, err := b24.Ref("contact")
    	if err != nil {
    		return 0, err
    	}

    	if err := b.AddAs("requisite", "crm.requisite.add", b24.Params{
    		"fields": b24.Params{
    			"ENTITY_TYPE_ID": typeContact,
    			"ENTITY_ID":      contactRef,
    			"PRESET_ID":      presetID,
    			"NAME":           "Основной реквизит",
    			"ACTIVE":         "Y",
    		},
    	}); err != nil {
    		return 0, err
    	}
    	requisiteRef, err := b24.Ref("requisite")
    	if err != nil {
    		return 0, err
    	}

    	// У одного реквизита может быть несколько адресов, но не больше одного
    	// каждого типа: второй crm.address.add с тем же TYPE_ID не пройдёт.
    	// Типы адресов перечисляет crm.enum.addresstype: 1 — фактический,
    	// 11 — адрес доставки.
    	addresses := []struct {
    		cmd    b24.CmdID
    		fields b24.Params
    	}{
    		{"address_actual", b24.Params{"TYPE_ID": 1, "ADDRESS_1": "Тверская улица, 7",
    			"CITY": "Москва", "POSTAL_CODE": "125009", "COUNTRY": "Россия"}},
    		{"address_delivery", b24.Params{"TYPE_ID": 11, "ADDRESS_1": "Гранатный переулок, 10",
    			"CITY": "Москва", "POSTAL_CODE": "123001", "COUNTRY": "Россия"}},
    	}
    	for _, a := range addresses {
    		a.fields["ENTITY_TYPE_ID"] = typeRequisite
    		a.fields["ENTITY_ID"] = requisiteRef
    		if err := b.AddAs(a.cmd, "crm.address.add", b24.Params{"fields": a.fields}); err != nil {
    			return 0, err
    		}
    	}

    	// Команды выполняются в порядке ДОБАВЛЕНИЯ, как бы они ни назывались, —
    	// именно это и делает цепочку работоспособной.
    	res, err := core.CallBatch(ctx, b)
    	if err != nil {
    		return 0, fmt.Errorf("подготовка данных батчем: %w", err)
    	}
    	raw, err := res.Get("contact")
    	if err != nil {
    		return 0, err
    	}
    	var contactID b24.ID
    	return contactID, json.Unmarshal(raw, &contactID)
    }

    func firstPreset(ctx context.Context, core *b24.Core) (b24.ID, error) {
    	res, err := core.Call(ctx, "crm.requisite.preset.list", b24.Params{
    		"select": []string{"ID", "NAME"}, "order": b24.Params{"ID": "ASC"},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return 0, fmt.Errorf("crm.requisite.preset.list: %w", err)
    	}
    	var presets []struct {
    		ID b24.ID `json:"ID"`
    	}
    	if err := json.Unmarshal(res.Result, &presets); err != nil {
    		return 0, err
    	}
    	if len(presets) == 0 {
    		return 0, fmt.Errorf("на портале нет шаблонов реквизитов")
    	}
    	return presets[0].ID, nil
    }

    // del убирает созданное. Ошибку уборки печатаем, но не возвращаем: она не
    // должна подменить собой настоящую ошибку сценария.
    func del(ctx context.Context, core *b24.Core, method string, params b24.Params) {
    	if _, err := core.Call(ctx, method, params); err != nil {
    		fmt.Fprintf(os.Stderr, "уборка, %s: %v\n", method, err)
    	}
    }
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

- Go

    ```go
    res, err := core.Call(ctx, "crm.contact.userfield.list", b24.Params{
    	"filter": b24.Params{"USER_TYPE_ID": "address"},
    }, b24.WithIdempotent())
    if err != nil {
    	// Метод доступен только администратору — это не повод обрывать сценарий
    	// с адресами из реквизитов, он уже отработал.
    	fmt.Fprintf(os.Stderr, "crm.contact.userfield.list: %v\n", err)
    	return nil
    }
    var fields []struct {
    	FieldName string `json:"FIELD_NAME"`
    	Multiple  string `json:"MULTIPLE"`
    }
    if err := json.Unmarshal(res.Result, &fields); err != nil {
    	return fmt.Errorf("разбор пользовательских полей: %w", err)
    }

    res, err = core.Call(ctx, "crm.contact.get",
    	b24.Params{"id": contactID}, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.contact.get: %w", err)
    }
    for _, f := range fields {
    	// От MULTIPLE зависит форма значения: у множественного поля это массив.
    	raw, ok := b24.Unwrap(res.Result, f.FieldName)
    	if !ok || b24.IsEmpty(raw) {
    		fmt.Printf("  поле %s (MULTIPLE=%s): не заполнено\n", f.FieldName, f.Multiple)
    		continue
    	}
    	fmt.Printf("  поле %s (MULTIPLE=%s): %s\n", f.FieldName, f.Multiple, raw)
    }
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
