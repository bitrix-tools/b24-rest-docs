# Как найти дубликаты в CRM по телефону и email

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — на чтение элементов CRM
>
> - [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md) — пользователь с правом на чтение элементов CRM
> - [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) — пользователь с правом на чтение элементов объекта CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Дубликаты появляются, когда один и тот же клиент — человек или компания — попадает в CRM несколько раз: через форму на сайте, звонок и ручное создание карточки. Найти их можно по совпадению телефона или адреса электронной почты.

Метод [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md) ищет совпадения сразу по лидам, контактам и компаниям, но возвращает только идентификаторы — без имен, телефонов и почты. Поэтому данные найденных объектов запрашиваем вторым шагом.

В результате сценария получим таблицу с колонками:

- идентификатор объекта

- тип объекта: лид, контакт или компания

- название или имя и фамилия

- телефон

- адрес электронной почты

Сценарий состоит из двух шагов.

1. Найти идентификаторы дубликатов методом [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md)
2. Получить данные найденных объектов методом [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md)

## Что нужно до начала

- вебхук создан от имени пользователя с правом читать лиды, контакты и компании

- в правах вебхука отмечен scope `crm`

- есть телефон или email, по которым нужно искать. Достаточно одного значения

Путь вебхука дает полный доступ к методам своего scope. Храните его в переменной окружения и не публикуйте в открытом коде.

Телефон и почта в примерах — `+79005553535` и `duplicate@example.com`. Замените их на свои значения. Остальные данные сценарий получает из ответов методов.

## Подготовим данные

Передадим скрипту номер телефона и email. В примерах на JS, PHP и Python значения спрашивает сам скрипт, в примере на Go они заданы константами. В интеграции значения подставит вызывающий код.

Заведем две структуры:

- `entityIDs` — идентификаторы найденных лидов, контактов и компаний. Ключи те же, что возвращает метод [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md): `LEAD`, `CONTACT`, `COMPANY`

- `rows` — строки итоговой таблицы

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

   ```js
   import { B24Hook } from '@bitrix24/b24jssdk'
   import { createInterface } from 'node:readline/promises'

   const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
   // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

   const rl = createInterface({ input: process.stdin, output: process.stdout })
   const phone = await rl.question('Введите номер телефона: ')
   const email = await rl.question('Введите email: ')
   rl.close()

   const entityIDs = {
       LEAD: [],
       CONTACT: [],
       COMPANY: []
   }

   const rows = []
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
       ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

   $phone = readline("Введите номер телефона: ");
   $email = readline("Введите email: ");

   $entityIDs = [
       'LEAD' => [],
       'CONTACT' => [],
       'COMPANY' => []
   ];

   $rows = [];
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

   phone = input("Введите номер телефона: ")
   email = input("Введите email: ")

   entity_ids = {
       "LEAD": [],
       "CONTACT": [],
       "COMPANY": [],
   }

   rows = []
   ```

- Go

    ```go
    // Телефон и почта, по которым ищем. Соседние вкладки спрашивают их у
    // пользователя; здесь они заданы константами, потому что пример сам создает
    // объекты с этими значениями.
    const (
    	phone = "+79005553535"
    	email = "duplicate@example.com"
    )

    // Идентификаторы найденных объектов и строки итоговой таблицы. Ключи —
    // те же, что возвращает crm.duplicate.findbycomm.
    entityIDs := map[string][]b24.ID{"LEAD": nil, "CONTACT": nil, "COMPANY": nil}
    rows := make([]row, 0)
    ```

{% endlist %}

## 1. Найдем дубликаты объектов

Чтобы найти повторяющиеся объекты, вызовем метод [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md) с параметрами:

- `type` — тип коммуникации: `PHONE` или `EMAIL`. Метод ищет по одному типу за вызов, поэтому по телефону и по почте вызываем его отдельно

- `values` — массив значений. Передадим одно значение, но в массиве можно передать сразу несколько

Идентификаторы из обоих ответов объединим в `entityIDs`, убирая повторы: один и тот же объект может найтись и по телефону, и по почте.

{% list tabs %}

- JS

   ```js
   // Объединяет идентификаторы из ответа метода с объектом entityIDs
   function mergeDuplicates(data) {
       for (const type of ['LEAD', 'CONTACT', 'COMPANY']) {
           if (Array.isArray(data?.[type])) {
               entityIDs[type] = [...new Set(entityIDs[type].concat(data[type]))];
           }
       }
   }

   for (const [type, value] of [['PHONE', phone], ['EMAIL', email]]) {
       if (!value) {
           continue;
       }
       const result = await $b24.actions.v2.call.make({
           method: 'crm.duplicate.findbycomm',
           params: { type, values: [value] }
       });
       if (result.isSuccess) {
           mergeDuplicates(result.getData()?.result);
       } else {
           console.error(`Ошибка поиска дубликатов по ${type}:`, result.getErrorMessages().join('; '));
       }
   }
   ```

- PHP

   ```php
   use Bitrix24\SDK\Services\CRM\Duplicates\Result\DuplicateResult;

   // Объединяет идентификаторы из ответа метода с массивом $entityIDs
   function mergeDuplicates(DuplicateResult $result, array &$entityIDs): void
   {
       $data = $result->getCoreResponse()->getResponseData()->getResult();
       foreach (['LEAD', 'CONTACT', 'COMPANY'] as $type) {
           if (!empty($data[$type]) && is_array($data[$type])) {
               $entityIDs[$type] = array_values(array_unique(
                   array_merge($entityIDs[$type], $data[$type])
               ));
           }
       }
   }

   if ($phone) {
       mergeDuplicates($sb->getCRMScope()->duplicate()->findByPhone([$phone]), $entityIDs);
   }

   if ($email) {
       mergeDuplicates($sb->getCRMScope()->duplicate()->findByEmail([$email]), $entityIDs);
   }
   ```

- Python

   ```python
   def merge_duplicates(data, entity_ids):
       """Объединяет идентификаторы из ответа метода с entity_ids."""
       if not isinstance(data, dict):
           return
       for key in entity_ids:
           found = data.get(key)
           if isinstance(found, list):
               entity_ids[key] = list(dict.fromkeys(entity_ids[key] + found))


   for comm_type, value in (("PHONE", phone), ("EMAIL", email)):
       if not value:
           continue
       result = client.crm.duplicate.findbycomm(
           type=comm_type,
           values=[value],
       ).response.result
       merge_duplicates(result, entity_ids)
   ```

- Go

    ```go
    // Метод ищет по ОДНОМУ типу коммуникации за вызов, поэтому телефон и почту
    // опрашиваем отдельно, а идентификаторы копим в общей карте.
    for _, comm := range []struct{ typ, value string }{
    	{"PHONE", phone},
    	{"EMAIL", email},
    } {
    	if comm.value == "" {
    		continue
    	}
    	res, err := core.Call(ctx, "crm.duplicate.findbycomm", b24.Params{
    		"type":   comm.typ,
    		"values": []string{comm.value},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.duplicate.findbycomm %s: %w", comm.typ, err)
    	}

    	// Ответ — объект с ключами LEAD, CONTACT, COMPANY. Ключа может не быть
    	// вовсе: если по этому типу ничего не нашлось, его просто не пришлют.
    	// Когда не нашлось ничего, result приходит пустым массивом, а не
    	// объектом, поэтому ошибку разбора здесь игнорируем.
    	var found map[string][]b24.ID
    	if err := json.Unmarshal(res.Result, &found); err == nil {
    		for key := range entityIDs {
    			entityIDs[key] = appendUnique(entityIDs[key], found[key])
    		}
    	}
    }
    ```

{% endlist %}

Метод вернет идентификаторы объектов, в которых встретился телефон или почта. В ответе будут только те ключи, по которым что-то нашлось.

```json
{
    "result": {
        "LEAD": [1001149],
        "CONTACT": [2693],
        "COMPANY": [3013]
    }
}
```

{% note warning "" %}

Если не нашлось ничего, метод возвращает `result` пустым массивом, а не объектом с пустыми ключами:

```json
{
    "result": []
}
```

Код, который сразу обращается к `result.LEAD`, на таком ответе упадет. Проверяйте тип значения до обращения к ключам.

{% endnote %}

## 2. Получим данные найденных объектов

Данные всех трех типов объектов возвращает один метод — [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md). Вызовем его для каждого непустого списка идентификаторов с параметрами:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Значения возвращает метод [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md): `1` — лид, `3` — контакт, `4` — компания

- `filter[id]` — массив идентификаторов из шага 1

- `select` — поля для вывода. Укажем `id`, `title`, `name`, `lastName`, `phone`, `email`. Один и тот же список подходит всем трем типам: поля, которых у объекта нет, метод отбрасывает

{% list tabs %}

- JS

   ```js
   const SELECT = ['id', 'title', 'name', 'lastName', 'phone', 'email'];
   const ENTITY_TYPES = [
       { key: 'LEAD', entityTypeId: 1, label: 'лид' },
       { key: 'CONTACT', entityTypeId: 3, label: 'контакт' },
       { key: 'COMPANY', entityTypeId: 4, label: 'компания' }
   ];

   for (const type of ENTITY_TYPES) {
       if (entityIDs[type.key].length === 0) {
           continue;
       }
       const result = await $b24.actions.v2.call.make({
           method: 'crm.item.list',
           params: {
               entityTypeId: type.entityTypeId,
               filter: { id: entityIDs[type.key] },
               select: SELECT
           }
       });
       if (!result.isSuccess) {
           console.error(result.getErrorMessages().join('; '));
           continue;
       }
       for (const item of result.getData().result.items) {
           const name = [item.name, item.lastName].filter(Boolean).join(' ');
           rows.push({
               id: item.id,
               kind: type.label,
               title: name || item.title || '—',
               phone: item.phone || '—',
               email: item.email || '—'
           });
       }
   }
   ```

- PHP

   ```php
   $select = ['id', 'title', 'name', 'lastName', 'phone', 'email'];
   $entityTypes = [
       ['key' => 'LEAD', 'entityTypeId' => 1, 'label' => 'лид'],
       ['key' => 'CONTACT', 'entityTypeId' => 3, 'label' => 'контакт'],
       ['key' => 'COMPANY', 'entityTypeId' => 4, 'label' => 'компания'],
   ];

   foreach ($entityTypes as $type) {
       if (empty($entityIDs[$type['key']])) {
           continue;
       }

       $items = $sb->getCRMScope()->item()->list(
           $type['entityTypeId'],
           [],
           ['id' => $entityIDs[$type['key']]],
           $select
       )->getItems();

       foreach ($items as $item) {
           $name = trim(($item->name ?? '') . ' ' . ($item->lastName ?? ''));
           $rows[] = [
               'id' => $item->id,
               'kind' => $type['label'],
               'title' => $name ?: ($item->title ?? '—'),
               'phone' => $item->phone ?: '—',
               'email' => $item->email ?: '—',
           ];
       }
   }
   ```

- Python

   ```python
   SELECT = ["id", "title", "name", "lastName", "phone", "email"]
   ENTITY_TYPES = (
       ("LEAD", 1, "лид"),
       ("CONTACT", 3, "контакт"),
       ("COMPANY", 4, "компания"),
   )

   for key, entity_type_id, label in ENTITY_TYPES:
       if not entity_ids[key]:
           continue

       items = client.crm.item.list(
           entity_type_id=entity_type_id,
           filter={"id": entity_ids[key]},
           select=SELECT,
       ).response.result["items"]

       for item in items:
           name = " ".join(filter(None, [item.get("name"), item.get("lastName")]))
           rows.append({
               "id": item["id"],
               "kind": label,
               "title": name or item.get("title") or "—",
               "phone": item.get("phone") or "—",
               "email": item.get("email") or "—",
           })
   ```

- Go

    ```go
    // Данные всех трех типов отдает один метод: отличается только entityTypeId.
    for _, spec := range entityTypes {
    	ids := entityIDs[spec.key]
    	if len(ids) == 0 {
    		continue
    	}
    	res, err := core.Call(ctx, "crm.item.list", b24.Params{
    		"entityTypeId": spec.entityTypeID,
    		"filter":       b24.Params{"id": ids},
    		"select":       []string{"id", "title", "name", "lastName", "phone", "email"},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.item.list %s: %w", spec.key, err)
    	}

    	// Метод заворачивает ответ в объект с ключом items, поля в camelCase.
    	var list struct {
    		Items []entity `json:"items"`
    	}
    	if err := json.Unmarshal(res.Result, &list); err != nil {
    		return fmt.Errorf("разбор ответа %s: %w", spec.key, err)
    	}
    	for _, e := range list.Items {
    		rows = append(rows, e.row(spec.label))
    	}
    }
    ```

{% endlist %}

Метод вернет объекты по фильтру. Ниже ответ для лида: у него есть и `title`, и имя с фамилией. У контакта не будет поля `title`, у компании — `name` и `lastName`.

```json
{
    "result": {
        "items": [
            {
                "id": 1001149,
                "title": "Заявка с сайта",
                "name": "Петр",
                "lastName": "Иванов",
                "email": "duplicate@example.com",
                "phone": "+79005553535"
            }
        ]
    },
    "total": 1
}
```

Поля `phone` и `email` приходят строками — это первое значение из карточки. Если у объекта несколько телефонов или адресов, остальные лежат в множественном поле `fm`. Оно приходит, только когда `select` не передан или указан как `["*"]`. Выбрать `fm` отдельным полем в `select` нельзя.

## Итоговая таблица

Соберем накопленные строки `rows` в таблицу.

{% list tabs %}

- JS

   ```js
   if (rows.length === 0) {
       console.log('Дубликаты не найдены');
   } else {
       console.table(rows);
   }
   ```

- PHP

   ```php
   if (empty($rows)) {
       echo "Дубликаты не найдены\n";
   } else {
       echo implode("\t", ['Идентификатор', 'Тип объекта', 'Название/Имя и фамилия', 'Телефон', 'Email']) . "\n";
       foreach ($rows as $row) {
           echo implode("\t", $row) . "\n";
       }
   }
   ```

- Python

   ```python
   if not rows:
       print("Дубликаты не найдены")
   else:
       print("\t".join(["Идентификатор", "Тип объекта", "Название/Имя и фамилия", "Телефон", "Email"]))
       for row in rows:
           print("\t".join(str(row[key]) for key in ("id", "kind", "title", "phone", "email")))
   ```

- Go

    ```go
    if len(rows) == 0 {
    	fmt.Println("Дубликаты не найдены")
    	return nil
    }
    fmt.Println("Идентификатор\tТип объекта\tНазвание/Имя и фамилия\tТелефон\tEmail")
    for _, r := range rows {
    	fmt.Printf("%d\t%s\t%s\t%s\t%s\n", r.ID, r.Kind, r.Title, r.Phone, r.Email)
    }
    ```

{% endlist %}

## Проверим результат

Сценарий выполнен, если в таблице есть строка на каждый идентификатор из шага 1.

Что проверить:

- количество строк совпадает с суммой длин списков `LEAD`, `CONTACT` и `COMPANY` из шага 1. Если строк меньше, часть объектов недоступна пользователю вебхука по правам

- в колонках `Телефон` и `Email` стоят те значения, по которым искали. Если в строке другой номер, объект совпал по почте либо у него несколько телефонов, а в ответе приходит только первый

Одна строка в таблице — не ошибка, а отсутствие дубликатов: значение встречается в CRM один раз.

Проверить результат в интерфейсе можно поиском по номеру телефона в строке поиска Битрикс24: в результатах будут те же лиды, контакты и компании.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `Communication values is not defined` | На шаге 1 в `values` передана строка вместо массива. Параметр принимает массив, даже когда значение одно ||
|| `403` `Access denied` | У пользователя вебхука нет прав на чтение элементов CRM. Проверьте, от чьего имени создан вебхук ||
|| `NOT_FOUND` | На шаге 2 передан `entityTypeId`, которому не соответствует ни один объект CRM. Нужны `1`, `3` или `4` ||
|| `INVALID_ARG_VALUE` `Invalid filter: field 'field' is not allowed in filter` | На шаге 2 в `filter` передано поле, по которому фильтровать нельзя. Список доступных полей возвращает метод [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) ||
|#

Пустой результат ошибкой не считается.

- пустой `result` на шаге 1 — объектов с таким телефоном или почтой нет. Возможная причина — формат номера, о нем ниже в блоке «Что важно учитывать»

- пустой `items` на шаге 2 при непустом шаге 1 — объекты найдены, но недоступны пользователю вебхука по правам. Повторите шаг 2 вебхуком администратора, чтобы это подтвердить

Оба метода только читают данные, поэтому после ошибки сценарий можно повторить с любого шага.

## Что важно учитывать

- метод [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md) сравнивает номер целиком, игнорируя только добавочный. Записи с номером в другом формате дубликатами не считаются, поэтому приводите номера к единому виду при сохранении в CRM

- если по одному типу объектов — лидам, контактам или компаниям — нашлось 20 дублей или больше, остальные типы метод не вернет вовсе. При 20 дублях-лидах в ответе будет только ключ `LEAD`, а контакты и компании с тем же телефоном молча пропадут. Чтобы получить их, повторите вызов с параметром `entity_type`: `CONTACT` или `COMPANY`

- метод [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) возвращает не больше 50 элементов за вызов. Если идентификаторов одного типа больше 50, перебирайте страницы параметром `start`

- объединить найденные дубликаты можно методом [crm.entity.mergebatch](../../../api-reference/crm/duplicates/crm-entity-merge-batch.md)

## Пример кода

Код проходит оба шага и выводит таблицу дубликатов. Заменить нужно путь вебхука: в примере на JS он читается из переменной окружения, в PHP и Python задан прямо в коде. Телефон и почту примеры на JS, PHP и Python спрашивают при запуске, в примере на Go они заданы константами.

{% list tabs %}

- JS

   ```js
   import { B24Hook } from '@bitrix24/b24jssdk'
   import { createInterface } from 'node:readline/promises'

   const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
   // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

   const SELECT = ['id', 'title', 'name', 'lastName', 'phone', 'email']
   const ENTITY_TYPES = [
       { key: 'LEAD', entityTypeId: 1, label: 'лид' },
       { key: 'CONTACT', entityTypeId: 3, label: 'контакт' },
       { key: 'COMPANY', entityTypeId: 4, label: 'компания' }
   ]

   // Запрос у пользователя телефона и email
   const rl = createInterface({ input: process.stdin, output: process.stdout })
   const phone = await rl.question('Введите номер телефона: ')
   const email = await rl.question('Введите email: ')
   rl.close()

   const entityIDs = { LEAD: [], CONTACT: [], COMPANY: [] }
   const rows = []

   // Объединяет идентификаторы из ответа метода с объектом entityIDs
   function mergeDuplicates(data) {
       for (const type of ['LEAD', 'CONTACT', 'COMPANY']) {
           if (Array.isArray(data?.[type])) {
               entityIDs[type] = [...new Set(entityIDs[type].concat(data[type]))]
           }
       }
   }

   // Шаг 1: Ищем дубликаты по телефону и по email
   for (const [type, value] of [['PHONE', phone], ['EMAIL', email]]) {
       if (!value) {
           continue
       }
       const result = await $b24.actions.v2.call.make({
           method: 'crm.duplicate.findbycomm',
           params: { type, values: [value] }
       })
       if (result.isSuccess) {
           mergeDuplicates(result.getData()?.result)
       } else {
           console.error(`Ошибка поиска дубликатов по ${type}:`, result.getErrorMessages().join('; '))
       }
   }

   // Шаг 2: Получаем данные найденных объектов
   for (const type of ENTITY_TYPES) {
       if (entityIDs[type.key].length === 0) {
           continue
       }
       const result = await $b24.actions.v2.call.make({
           method: 'crm.item.list',
           params: {
               entityTypeId: type.entityTypeId,
               filter: { id: entityIDs[type.key] },
               select: SELECT
           }
       })
       if (!result.isSuccess) {
           console.error(result.getErrorMessages().join('; '))
           continue
       }
       for (const item of result.getData().result.items) {
           const name = [item.name, item.lastName].filter(Boolean).join(' ')
           rows.push({
               id: item.id,
               kind: type.label,
               title: name || item.title || '—',
               phone: item.phone || '—',
               email: item.email || '—'
           })
       }
   }

   // Выводим таблицу в консоль
   if (rows.length === 0) {
       console.log('Дубликаты не найдены')
   } else {
       console.table(rows)
   }
   ```

- PHP

   ```php
   <?php
   // composer require bitrix24/b24phpsdk:"^3.0"
   require_once 'vendor/autoload.php';

   use Bitrix24\SDK\Services\ServiceBuilderFactory;
   use Bitrix24\SDK\Services\CRM\Duplicates\Result\DuplicateResult;
   use Symfony\Component\EventDispatcher\EventDispatcher;
   use Monolog\Logger;
   use Monolog\Handler\StreamHandler;

   $log = new Logger('b24');
   $log->pushHandler(new StreamHandler('php://stdout'));

   $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
       ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

   // Запрос у пользователя телефона и email
   $phone = readline("Введите номер телефона: ");
   $email = readline("Введите email: ");

   $entityIDs = ['LEAD' => [], 'CONTACT' => [], 'COMPANY' => []];
   $rows = [];

   $select = ['id', 'title', 'name', 'lastName', 'phone', 'email'];
   $entityTypes = [
       ['key' => 'LEAD', 'entityTypeId' => 1, 'label' => 'лид'],
       ['key' => 'CONTACT', 'entityTypeId' => 3, 'label' => 'контакт'],
       ['key' => 'COMPANY', 'entityTypeId' => 4, 'label' => 'компания'],
   ];

   // Объединяет идентификаторы из ответа метода с массивом $entityIDs
   function mergeDuplicates(DuplicateResult $result, array &$entityIDs): void
   {
       $data = $result->getCoreResponse()->getResponseData()->getResult();
       foreach (['LEAD', 'CONTACT', 'COMPANY'] as $type) {
           if (!empty($data[$type]) && is_array($data[$type])) {
               $entityIDs[$type] = array_values(array_unique(
                   array_merge($entityIDs[$type], $data[$type])
               ));
           }
       }
   }

   try {
       // Шаг 1: Ищем дубликаты по телефону и по email
       if ($phone) {
           mergeDuplicates($sb->getCRMScope()->duplicate()->findByPhone([$phone]), $entityIDs);
       }

       if ($email) {
           mergeDuplicates($sb->getCRMScope()->duplicate()->findByEmail([$email]), $entityIDs);
       }

       // Шаг 2: Получаем данные найденных объектов
       foreach ($entityTypes as $type) {
           if (empty($entityIDs[$type['key']])) {
               continue;
           }

           $items = $sb->getCRMScope()->item()->list(
               $type['entityTypeId'],
               [],
               ['id' => $entityIDs[$type['key']]],
               $select
           )->getItems();

           foreach ($items as $item) {
               $name = trim(($item->name ?? '') . ' ' . ($item->lastName ?? ''));
               $rows[] = [
                   'id' => $item->id,
                   'kind' => $type['label'],
                   'title' => $name ?: ($item->title ?? '—'),
                   'phone' => $item->phone ?: '—',
                   'email' => $item->email ?: '—',
               ];
           }
       }
   } catch (\Throwable $e) {
       echo $e->getMessage() . "\n";
   }

   // Выводим таблицу через табуляцию
   if (empty($rows)) {
       echo "Дубликаты не найдены\n";
   } else {
       echo implode("\t", ['Идентификатор', 'Тип объекта', 'Название/Имя и фамилия', 'Телефон', 'Email']) . "\n";
       foreach ($rows as $row) {
           echo implode("\t", $row) . "\n";
       }
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

    SELECT = ["id", "title", "name", "lastName", "phone", "email"]
    ENTITY_TYPES = (
        ("LEAD", 1, "лид"),
        ("CONTACT", 3, "контакт"),
        ("COMPANY", 4, "компания"),
    )


    def merge_duplicates(data, entity_ids):
        """Объединяет идентификаторы из ответа метода с entity_ids."""
        if not isinstance(data, dict):
            return
        for key in entity_ids:
            found = data.get(key)
            if isinstance(found, list):
                entity_ids[key] = list(dict.fromkeys(entity_ids[key] + found))


    phone = input("Введите номер телефона: ")
    email = input("Введите email: ")

    entity_ids = {"LEAD": [], "CONTACT": [], "COMPANY": []}
    rows = []

    try:
        # Шаг 1: Ищем дубликаты по телефону и по email
        for comm_type, value in (("PHONE", phone), ("EMAIL", email)):
            if not value:
                continue
            result = client.crm.duplicate.findbycomm(
                type=comm_type,
                values=[value],
            ).response.result
            merge_duplicates(result, entity_ids)

        # Шаг 2: Получаем данные найденных объектов
        for key, entity_type_id, label in ENTITY_TYPES:
            if not entity_ids[key]:
                continue

            items = client.crm.item.list(
                entity_type_id=entity_type_id,
                filter={"id": entity_ids[key]},
                select=SELECT,
            ).response.result["items"]

            for item in items:
                name = " ".join(filter(None, [item.get("name"), item.get("lastName")]))
                rows.append({
                    "id": item["id"],
                    "kind": label,
                    "title": name or item.get("title") or "—",
                    "phone": item.get("phone") or "—",
                    "email": item.get("email") or "—",
                })
    except BitrixAPIError as error:
        print(error)

    # Выводим таблицу через табуляцию
    if not rows:
        print("Дубликаты не найдены")
    else:
        print("\t".join(["Идентификатор", "Тип объекта", "Название/Имя и фамилия", "Телефон", "Email"]))
        for row in rows:
            print("\t".join(str(row[key]) for key in ("id", "kind", "title", "phone", "email")))
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
    // Пример самодостаточный: он заводит лид, контакт и компанию с одним и тем же
    // телефоном и почтой, находит их как дубликаты, выводит таблицу и убирает за
    // собой. Запускается на любом портале, ничего править не нужно.
    package main

    import (
    	"context"
    	"encoding/json"
    	"fmt"
    	"log"
    	"os"
    	"strings"

    	b24 "github.com/bitrix24/b24gosdk"
    )

    // Телефон и почта, по которым ищем. Соседние вкладки спрашивают их у
    // пользователя; здесь они заданы константами, потому что пример сам создает
    // объекты с этими значениями.
    const (
    	phone = "+79005553535"
    	email = "duplicate@example.com"
    )

    // Типы объектов, в которых ищем дубликаты. Ключ — тот же, что в ответе
    // crm.duplicate.findbycomm, entityTypeID — из crm.enum.ownertype.
    var entityTypes = []struct {
    	key          string
    	entityTypeID int
    	label        string
    }{
    	{"LEAD", 1, "лид"},
    	{"CONTACT", 3, "контакт"},
    	{"COMPANY", 4, "компания"},
    }

    func main() {
    	if err := run(context.Background()); err != nil {
    		log.Fatal(err)
    	}
    }

    func run(ctx context.Context) error {
    	// Путь вебхука — это секрет, поэтому он приходит из окружения, а не из кода.
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    	// Идентификаторы найденных объектов и строки итоговой таблицы. Ключи —
    	// те же, что возвращает crm.duplicate.findbycomm.
    	entityIDs := map[string][]b24.ID{"LEAD": nil, "CONTACT": nil, "COMPANY": nil}
    	rows := make([]row, 0)

    	// --- подготовка: свои дубликаты

    	cleanup, err := createDuplicates(ctx, core, phone, email)
    	defer cleanup()
    	if err != nil {
    		return err
    	}

    	// --- шаг 1: ищем дубликаты по коммуникациям
    	// Метод ищет по ОДНОМУ типу коммуникации за вызов, поэтому телефон и почту
    	// опрашиваем отдельно, а идентификаторы копим в общей карте.
    	for _, comm := range []struct{ typ, value string }{
    		{"PHONE", phone},
    		{"EMAIL", email},
    	} {
    		if comm.value == "" {
    			continue
    		}
    		res, err := core.Call(ctx, "crm.duplicate.findbycomm", b24.Params{
    			"type":   comm.typ,
    			"values": []string{comm.value},
    		}, b24.WithIdempotent())
    		if err != nil {
    			return fmt.Errorf("crm.duplicate.findbycomm %s: %w", comm.typ, err)
    		}

    		// Ответ — объект с ключами LEAD, CONTACT, COMPANY. Ключа может не быть
    		// вовсе: если по этому типу ничего не нашлось, его просто не пришлют.
    		// Когда не нашлось ничего, result приходит пустым массивом, а не
    		// объектом, поэтому ошибку разбора здесь игнорируем.
    		var found map[string][]b24.ID
    		if err := json.Unmarshal(res.Result, &found); err == nil {
    			for key := range entityIDs {
    				entityIDs[key] = appendUnique(entityIDs[key], found[key])
    			}
    		}
    	}
    	fmt.Printf("найдено: лидов %d, контактов %d, компаний %d\n",
    		len(entityIDs["LEAD"]), len(entityIDs["CONTACT"]), len(entityIDs["COMPANY"]))

    	// --- шаг 2: данные найденных объектов
    	// Данные всех трех типов отдает один метод: отличается только entityTypeId.
    	for _, spec := range entityTypes {
    		ids := entityIDs[spec.key]
    		if len(ids) == 0 {
    			continue
    		}
    		res, err := core.Call(ctx, "crm.item.list", b24.Params{
    			"entityTypeId": spec.entityTypeID,
    			"filter":       b24.Params{"id": ids},
    			"select":       []string{"id", "title", "name", "lastName", "phone", "email"},
    		}, b24.WithIdempotent())
    		if err != nil {
    			return fmt.Errorf("crm.item.list %s: %w", spec.key, err)
    		}

    		// Метод заворачивает ответ в объект с ключом items, поля в camelCase.
    		var list struct {
    			Items []entity `json:"items"`
    		}
    		if err := json.Unmarshal(res.Result, &list); err != nil {
    			return fmt.Errorf("разбор ответа %s: %w", spec.key, err)
    		}
    		for _, e := range list.Items {
    			rows = append(rows, e.row(spec.label))
    		}
    	}

    	// --- выводим таблицу
    	if len(rows) == 0 {
    		fmt.Println("Дубликаты не найдены")
    		return nil
    	}
    	fmt.Println("Идентификатор\tТип объекта\tНазвание/Имя и фамилия\tТелефон\tEmail")
    	for _, r := range rows {
    		fmt.Printf("%d\t%s\t%s\t%s\t%s\n", r.ID, r.Kind, r.Title, r.Phone, r.Email)
    	}
    	return nil
    }

    // entity — общий вид строки ответа crm.item.list: набор полей у лида,
    // контакта и компании разный, но нужные нам совпадают.
    type entity struct {
    	ID       b24.ID `json:"id"`
    	Title    string `json:"title"`
    	Name     string `json:"name"`
    	LastName string `json:"lastName"`
    	Phone    string `json:"phone"`
    	Email    string `json:"email"`
    }

    type row struct {
    	ID                        b24.ID
    	Kind, Title, Phone, Email string
    }

    func (e entity) row(kind string) row {
    	title := strings.TrimSpace(e.Name + " " + e.LastName)
    	if title == "" {
    		title = e.Title
    	}
    	return row{ID: e.ID, Kind: kind, Title: title,
    		Phone: orDash(e.Phone), Email: orDash(e.Email)}
    }

    func orDash(value string) string {
    	if value == "" {
    		return "—"
    	}
    	return value
    }

    func appendUnique(dst, src []b24.ID) []b24.ID {
    	seen := make(map[b24.ID]bool, len(dst))
    	for _, id := range dst {
    		seen[id] = true
    	}
    	for _, id := range src {
    		if !seen[id] {
    			seen[id] = true
    			dst = append(dst, id)
    		}
    	}
    	return dst
    }

    // --- вспомогательное: подготовка данных и уборка

    // createDuplicates заводит лид, контакт и компанию с одинаковыми телефоном и
    // почтой — ровно ту ситуацию, которую ищет сценарий. Возвращает функцию
    // уборки: она вызывается и тогда, когда подготовка оборвалась на середине.
    func createDuplicates(ctx context.Context, core *b24.Core, phone, email string) (func(), error) {
    	comm := b24.Params{
    		"PHONE": []map[string]any{b24.MultifieldAdd(phone, "WORK")},
    		"EMAIL": []map[string]any{b24.MultifieldAdd(email, "WORK")},
    	}
    	created := map[string]b24.ID{}
    	cleanup := func() {
    		for method, id := range created {
    			del(ctx, core, method, b24.Params{"id": id})
    		}
    	}

    	for _, spec := range []struct {
    		add, delete string
    		fields      b24.Params
    	}{
    		{"crm.lead.add", "crm.lead.delete", b24.Params{"TITLE": "Заявка с сайта", "NAME": "Петр", "LAST_NAME": "Иванов"}},
    		{"crm.contact.add", "crm.contact.delete", b24.Params{"NAME": "Петр", "LAST_NAME": "Иванов"}},
    		{"crm.company.add", "crm.company.delete", b24.Params{"TITLE": "ООО Ромашка"}},
    	} {
    		fields := b24.Params{}
    		for k, v := range spec.fields {
    			fields[k] = v
    		}
    		for k, v := range comm {
    			fields[k] = v
    		}
    		res, err := core.Call(ctx, spec.add, b24.Params{"fields": fields})
    		if err != nil {
    			return cleanup, fmt.Errorf("%s: %w", spec.add, err)
    		}
    		var id b24.ID
    		if err := json.Unmarshal(res.Result, &id); err != nil {
    			return cleanup, fmt.Errorf("разбор идентификатора из %s: %w", spec.add, err)
    		}
    		created[spec.delete] = id
    	}
    	return cleanup, nil
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

## Продолжите изучение

- [{#T}](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md)
- [{#T}](../../../api-reference/crm/duplicates/crm-entity-merge-batch.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-list.md)
- [{#T}](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)
- [{#T}](./how-to-get-elements-by-stage-filter.md)
