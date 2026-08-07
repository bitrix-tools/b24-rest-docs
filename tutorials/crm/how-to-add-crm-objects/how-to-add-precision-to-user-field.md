# Как настроить округление для пользовательского поля типа «Число»

> Scope: [`crm`, `userfieldconfig`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «Разрешить изменять настройки»
>
> - [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) и [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md) — пользователь с правом «Разрешить изменять настройки» в CRM
> - [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) — пользователь с правом на чтение сделок

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

У пользовательских полей есть стандартные настройки: название, обязательность заполнения, множественное значение.

Дополнительно есть специализированные настройки, их набор зависит от типа поля:

- значения для списка
- точность округления для чисел
- валюта для денежных полей

У типа «Число» — `double` — точность задает настройка `PRECISION`. Это целое число от 0 до 12: столько знаков после запятой остается в значении. Битрикс24 округляет значение в момент сохранения. Например, при `PRECISION`: `3` введенное `1,23456` сохранится как `1.235`.

## Выберите сценарий

На этой странице два независимых сценария. Они не связаны между собой: второй не использует результат первого, а начинается с поиска уже существующего поля.

- [Создаем поле сразу с настройкой округления](#create) — один вызов [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md). Подходит, когда поля еще нет.
- [Изменяем настройку у существующего поля](#update) — два шага: получаем `ID` поля методом [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md), затем передаем его в [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md).

В обоих сценариях примеры работают с полями сделок. Для другого объекта CRM изменится идентификатор объекта в `entityId` и метод получения списка полей — например, [crm.lead.userfield.list](../../../api-reference/crm/leads/userfield/crm-lead-userfield-list.md) для лидов.

## Подготовим данные

Для выполнения примеров нужны:

- входящий вебхук со scope `crm` и `userfieldconfig`. Вебхук выполняет запросы с правами создавшего его пользователя. Не публикуйте секретный код вебхука в клиентском коде и репозиториях — храните его в переменных окружения, как в примере на JS. В примерах на PHP и Python на месте адреса вебхука стоит плейсхолдер, подставьте туда свой способ хранения секрета
- право «Разрешить изменять настройки» у пользователя вебхука. Это общее право на настройки CRM: оно выдается роли целиком и не задается отдельно для сделок или другого объекта. Исключение — смарт-процессы внутри автоматизированного решения: у них право проверяется на уровне самого решения. Без этого права [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) и [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md) вернут ошибку доступа

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее, для новых проектов — 22 или новее. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`. Для примеров с b24pysdk нужен Python 3.9 или новее, для примеров с [B24PhpSDK](../../../sdk/b24phpsdk/index.md) версии 3 — PHP 8.4 или новее.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Примеры шагов продолжают друг друга. SDK инициализируется один раз здесь, дальше в примерах используется готовый экземпляр: `$b24` в JS, `$sb` в PHP и `client` в Python.

{% list tabs %}

- JS
  
    ```JavaScript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'
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
    ```

- Go

    ```go
    // Путь вебхука — это секрет, поэтому он приходит из окружения, а не из кода.
    // Клиент строится один раз на портал: он держит HTTP-клиент и состояние
    // авторизации.
    core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()
    ```

{% endlist %}

## Учтите разный регистр полей {#case}

Методы на этой странице возвращают одни и те же данные в разном регистре. Так работает API — приводить форматы друг к другу не нужно, но их легко перепутать в коде.

- методы `userfieldconfig.*` принимают и возвращают поля в camelCase: `fieldName`, `userTypeId`, `editFormLabel`, `settings`
- методы `crm.*.userfield.*`, в том числе [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md), возвращают поля в UPPER_SNAKE: `FIELD_NAME`, `USER_TYPE_ID`, `EDIT_FORM_LABEL`, `SETTINGS`

Ключи внутри самих настроек в обоих случаях в верхнем регистре: `PRECISION`, `SIZE`, `MIN_VALUE`, `MAX_VALUE`, `DEFAULT_VALUE`. Поэтому точность созданного поля лежит в `settings.PRECISION`, а точность поля из списка сделок — в `SETTINGS.PRECISION`.

## Создаем поле сразу с настройкой округления {#create}

Создадим поле сделки с типом «Число» и точностью три знака после запятой. Если в такое поле ввести значение с четырьмя или более знаками после запятой, при сохранении оно округлится до трех знаков.

Чтобы создать пользовательское поле, используем метод [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) с параметрами:

- `moduleId` — идентификатор модуля в котором метод создаст поле, обязательный параметр. В примере создаем поле для сделок, модуль — `crm`

- `field[entityId]` — идентификатор объекта, обязательный параметр. У сделок и других базовых объектов CRM идентификатор фиксированный: `CRM_DEAL`, `CRM_LEAD`, `CRM_CONTACT`, `CRM_COMPANY`. Формат `CRM_{ID}` с числовым идентификатором используется только для пользовательских смарт-процессов, а у системных — свои строковые идентификаторы вроде `CRM_SMART_INVOICE`. Полный перечень есть в статье [Настройки пользовательских полей](../../../api-reference/crm/universal/userfieldconfig/index.md#entity-id). В примере укажем `CRM_DEAL`

- `field[fieldName]` — код поля по формуле `UF_ + {идентификатор объекта} + _ + {произвольная строка в UPPERCASE}`. Обязательный параметр. Код должен начинаться с `UF_` и идентификатора объекта из `entityId`, иначе метод вернет ошибку. Допустимы символы `A-Z`, `0-9` и `_`, ограничение длины — 50 символов. В примере укажем `UF_CRM_DEAL_NEW_DOUBLE_FIELD`

- `field[userTypeId]` — идентификатор [типа поля](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-types.md), обязательный параметр. В примере укажем `double` для создания поля типа число

- `field[editFormLabel]` — массив названий для отображения поля в Битрикс24 на разных языках. Необязательный параметр, при отсутствии названия в Битрикс24 будет отображаться код поля

- `field[settings]` — массив дополнительных настроек поля в зависимости от его типа. В примере укажем настройку `PRECISION` — точность. В нее передадим целое число, равное количеству знаков после запятой. Параметр необязательный, но для типа «Число» его лучше передавать: без него точность будет `0` и значения округлятся до целых

{% list tabs %}

- JS
  
    ```JavaScript
    const addResponse = await $b24.actions.v2.call.make({
        method: 'userfieldconfig.add',
        params: {
            moduleId: 'crm', // Идентификатор модуля
            field: {
                entityId: 'CRM_DEAL', // Идентификатор объекта
                fieldName: 'UF_CRM_DEAL_NEW_DOUBLE_FIELD', // Код поля
                userTypeId: 'double', // Идентификатор типа поля
                editFormLabel: {
                    'ru': 'Число с округлением', // Название поля на русском
                    'en': 'PRECISION double' // Название поля на английском
                },
                settings: { // Дополнительные настройки поля
                    PRECISION: 3 // Количество знаков после запятой
                }
            }
        },
        requestId: 'userfieldconfig-add'
    });

    if (!addResponse.isSuccess) {
        throw new Error(addResponse.getErrorMessages().join('; '))
    }

    const createdField = addResponse.getData().result.field;
    console.log(createdField.id, createdField.settings.PRECISION);
    ```

- PHP
  
    ```php
    // у userfieldconfig.add нет типизированной обертки в SDK — вызываем метод через ядро
    $createdField = $sb->core->call(
        'userfieldconfig.add',
        [
            'moduleId' => 'crm', // Идентификатор модуля
            'field' => [
                'entityId' => 'CRM_DEAL', // Идентификатор объекта
                'fieldName' => 'UF_CRM_DEAL_NEW_DOUBLE_FIELD', // Код поля
                'userTypeId' => 'double', // Идентификатор типа поля
                'editFormLabel' => [
                    'ru' => 'Число с округлением', // Название поля на русском
                    'en' => 'PRECISION double' // Название поля на английском
                ],
                'settings' => [ // Дополнительные настройки поля
                    'PRECISION' => 3 // Количество знаков после запятой
                ]
            ]
        ]
    )->getResponseData()->getResult()['field'];

    echo $createdField['id'] . ': ' . $createdField['settings']['PRECISION'];
    ```

- Python

    ```python
    try:
        created_field = client.userfieldconfig.add(
            module_id="crm",
            field={
                "entityId": "CRM_DEAL",
                "fieldName": "UF_CRM_DEAL_NEW_DOUBLE_FIELD",
                "userTypeId": "double",
                "editFormLabel": {
                    "ru": "Число с округлением",
                    "en": "PRECISION double",
                },
                "settings": {
                    "PRECISION": 3,
                },
            },
        ).response.result["field"]
    except BitrixAPIError as error:
        print(f"Ошибка: {error}")
    else:
        print(created_field["id"], created_field["settings"]["PRECISION"])
    ```

- Go

    ```go
    res, err := core.Call(ctx, "userfieldconfig.add", b24.Params{
    	"moduleId": "crm",
    	"field": b24.Params{
    		"entityId":   "CRM_DEAL",
    		"fieldName":  fieldName,
    		"userTypeId": "double",
    		"editFormLabel": b24.Params{
    			"ru": fieldLabel,
    			"en": "PRECISION double",
    		},
    		// Параметр необязательный, но для типа «Число» его лучше
    		// передавать: без него точность будет 0 и значения округлятся
    		// до целых.
    		"settings": b24.Params{"PRECISION": 3},
    	},
    })
    if err != nil {
    	// Код ошибки сравнивается через errors.Is, а не строкой: опечатка в
    	// литерале скомпилируется и молча уведёт в другую ветку.
    	if errors.Is(err, b24.ErrAccessDenied) {
    		return fmt.Errorf("нужно право «Разрешить изменять настройки» в CRM: %w", err)
    	}
    	return fmt.Errorf("userfieldconfig.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом field и отвечает в camelCase:
    // точность лежит в settings.PRECISION, а не в SETTINGS.PRECISION.
    var added struct {
    	Field struct {
    		ID       b24.ID         `json:"id"`
    		Settings map[string]any `json:"settings"`
    	} `json:"field"`
    }
    if err := json.Unmarshal(res.Result, &added); err != nil {
    	return fmt.Errorf("разбор созданного поля: %w", err)
    }
    ```

{% endlist %}

В результате получим данные созданного поля.

```JSON
{
    "result": {
        "field": {
            "id": "6961",
            "entityId": "CRM_DEAL",
            "fieldName": "UF_CRM_DEAL_NEW_DOUBLE_FIELD",
            "userTypeId": "double",
            "xmlId": null,
            "sort": "100",
            "multiple": "N",
            "mandatory": "N",
            "showFilter": "N",
            "showInList": "Y",
            "editInList": "Y",
            "isSearchable": "N",
            "settings": {
                "PRECISION": 3,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            },
            "languageId": {
                "en": "en",
                "ru": "ru"
            },
            "editFormLabel": {
                "en": "PRECISION double",
                "ru": "Число с округлением"
            },
            "listColumnLabel": {
                "en": null,
                "ru": null
            },
            "listFilterLabel": {
                "en": null,
                "ru": null
            },
            "errorMessage": {
                "en": null,
                "ru": null
            },
            "helpMessage": {
                "en": null,
                "ru": null
            }
        }
    }
}
```

Ответ подтверждает результат: в `settings.PRECISION` стоит переданная точность `3`, остальные настройки типа заполнены значениями по умолчанию. Сохраните `id` поля — `6961` в примере. По нему поле изменяют методом [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md) или удаляют методом [userfieldconfig.delete](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-delete.md), не запрашивая список полей заново.

На этом первый сценарий закончен. Перейдите к разделу [Проверим результат](#check) — второй сценарий нужен только для полей, которые уже существуют.

## Изменяем настройку у существующего поля {#update}

Сценарий не зависит от первого: поле уже создано, его точность нужно изменить. Метод [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md) принимает `id` поля, поэтому сценарий состоит из двух шагов.

1. Получим `ID` и текущие настройки поля методом [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md)
2. Передадим их в [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md), изменив только точность

Если поле только что создано первым сценарием, первый шаг не нужен: и `id`, и настройки уже пришли в ответе [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) — в `field.id` и `field.settings`. Обратите внимание, что в этом ответе они в camelCase.

### 1. Получаем ID поля {#field-id}

Чтобы получить ID поля используем метод [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) с параметрами:

- `filter[LANG]` — фильтр по языку используем для вывода названий полей на нужном языке. Без этого фильтра названия не возвращаются вовсе, и найти поле по названию не получится

- `filter[USER_TYPE_ID]` — фильтр по типу поля используем чтобы получить только поля с типом «Число» в результате

Метод возвращает поля в UPPER_SNAKE — учитывайте это, когда [сравниваете его ответ с ответами `userfieldconfig.*`](#case).

{% list tabs %}

- JS
  
    ```JavaScript
    const listResponse = await $b24.actions.v2.call.make({
        method: 'crm.deal.userfield.list',
        params: {
            filter: {
                LANG: 'ru', // Фильтр по языку для вывода названия поля
                USER_TYPE_ID: 'double' // Фильтр по типу поля
            }
        },
        requestId: 'userfield-list'
    });

    if (!listResponse.isSuccess) {
        throw new Error(listResponse.getErrorMessages().join('; '))
    }

    // Выбираем нужное поле по названию — замените на название своего поля
    const targetField = listResponse.getData().result
        .find(field => field.EDIT_FORM_LABEL === 'Сумма к возврату');

    if (!targetField) {
        throw new Error('Поле с указанным названием не найдено')
    }
    ```

- PHP
  
    ```php
    $fields = $sb->getCRMScope()->dealUserfield()->list(
        order: [],
        filter: [
            'LANG' => 'ru', // Фильтр по языку для вывода названия поля
            'USER_TYPE_ID' => 'double' // Фильтр по типу поля
        ]
    )->getUserfields();

    // Выбираем нужное поле по названию — замените на название своего поля
    $targetField = null;
    foreach ($fields as $field) {
        if ($field->EDIT_FORM_LABEL === 'Сумма к возврату') {
            $targetField = $field;
            break;
        }
    }

    if ($targetField === null) {
        throw new \RuntimeException('Поле с указанным названием не найдено');
    }
    ```

- Python

    ```python
    fields = client.crm.deal.userfield.list(
        filter={
            "LANG": "ru",
            "USER_TYPE_ID": "double",
        }
    ).response.result

    # Выбираем нужное поле по названию — замените на название своего поля
    target_field = next(
        (field for field in fields if field["EDIT_FORM_LABEL"] == "Сумма к возврату"),
        None,
    )

    if target_field is None:
        raise RuntimeError("Поле с указанным названием не найдено")
    ```

- Go

    ```go
    // Без фильтра LANG названия не возвращаются вовсе, и найти поле по названию
    // не получится.
    res, err = core.Call(ctx, "crm.deal.userfield.list", b24.Params{
    	"filter": b24.Params{"LANG": "ru", "USER_TYPE_ID": "double"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.deal.userfield.list: %w", err)
    }

    // А этот метод отвечает в UPPER_SNAKE — те же данные, другой регистр.
    // Ключи внутри самих настроек в обоих случаях в верхнем регистре.
    var fields []struct {
    	ID            b24.ID         `json:"ID"`
    	FieldName     string         `json:"FIELD_NAME"`
    	EditFormLabel string         `json:"EDIT_FORM_LABEL"`
    	Settings      map[string]any `json:"SETTINGS"`
    }
    if err := json.Unmarshal(res.Result, &fields); err != nil {
    	return fmt.Errorf("разбор пользовательских полей: %w", err)
    }

    target := -1
    for i, f := range fields {
    	if f.EditFormLabel == fieldLabel {
    		target = i
    		break
    	}
    }
    if target < 0 {
    	return fmt.Errorf("поле %q не найдено", fieldLabel)
    }
    ```

{% endlist %}

В результате получим все числовые поля сделок с названиями.

```JSON
{
    "result": [
        {
            "ID": "6963",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1740471712",
            "USER_TYPE_ID": "double",
            "XML_ID": null,
            "SORT": "100",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "PRECISION": 2,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            },
            "EDIT_FORM_LABEL": "Аванс",
            "LIST_COLUMN_LABEL": "Аванс",
            "LIST_FILTER_LABEL": "Аванс",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        },
        {
            "ID": "6807",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1723464314",
            "USER_TYPE_ID": "double",
            "XML_ID": null,
            "SORT": "150",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "PRECISION": 2,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            },
            "EDIT_FORM_LABEL": "Сумма к возврату",
            "LIST_COLUMN_LABEL": "Сумма к возврату",
            "LIST_FILTER_LABEL": "Сумма к возврату",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        }
    ],
    "total": 2
}
```

Из ответа нужны два значения выбранного поля:

- `ID` — его передадим в `id` следующего вызова. В примере это `6807` у поля «Сумма к возврату»
- `SETTINGS` — текущие настройки поля. Их передадим обратно, чтобы изменить только точность и не сбросить остальные настройки. Сейчас в `SETTINGS.PRECISION` стоит `2`

Поле `EDIT_FORM_LABEL` — это название, по которому поле ищут в списке. Оно приходит строкой только потому, что в фильтре передан `LANG`.

### 2. Изменяем настройку округления {#precision}

Для изменения настройки существующего поля используем метод [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md) с параметрами:

- `moduleId` — идентификатор модуля в котором метод изменит поле, обязательный параметр. В примере изменяем поле сделок, модуль — `crm`

- `id` — идентификатор пользовательского поля, обязательный параметр. В примере передадим `ID` поля из [шага 1](#field-id) — `6807`

- `field[settings]` — массив дополнительных настроек поля в зависимости от его типа. В примере укажем настройку `PRECISION` — точность. В нее передадим целое число, равное количеству знаков после запятой

{% note warning "" %}

`field[settings]` заменяет набор настроек целиком, а не дописывает переданные ключи к прежним. Если передать только `PRECISION`, остальные настройки типа «Число» сбросятся на значения по умолчанию: `SIZE` — `20`, `MIN_VALUE` и `MAX_VALUE` — `0`, `DEFAULT_VALUE` — `null`. Поэтому в примерах мы берем `SETTINGS` из шага 1 и меняем в них только точность.

Понижать точность у заполненного поля опасно: лишние знаки не скрываются, а отбрасываются при следующем сохранении сделки. Вернуть их, задав прежнее значение `PRECISION`, уже нельзя.

Полный набор настроек типа смотрите в `settings` любого ответа `userfieldconfig.*` — там все пять ключей. Метод [crm.userfield.settings.fields](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-settings-fields.md) для типа `double` перечисляет только `DEFAULT_VALUE` и `PRECISION`, и на него в этом вопросе полагаться нельзя.

{% endnote %}

{% list tabs %}

- JS
  
    ```JavaScript
    const updateResponse = await $b24.actions.v2.call.make({
        method: 'userfieldconfig.update',
        params: {
            moduleId: 'crm', // Идентификатор модуля
            id: Number(targetField.ID), // ID поля из шага 1
            field: {
                settings: { // Дополнительные настройки поля
                    ...targetField.SETTINGS, // Переносим текущие настройки из шага 1
                    PRECISION: 3 // Количество знаков после запятой
                }
            }
        },
        requestId: 'userfieldconfig-update'
    });

    if (!updateResponse.isSuccess) {
        throw new Error(updateResponse.getErrorMessages().join('; '))
    }

    const updatedField = updateResponse.getData().result.field;
    console.log(updatedField.id, updatedField.settings.PRECISION);
    ```

- PHP
  
    ```php
    // у userfieldconfig.update нет типизированной обертки в SDK — вызываем метод через ядро
    $updatedField = $sb->core->call(
        'userfieldconfig.update',
        [
            'moduleId' => 'crm', // Идентификатор модуля
            'id' => (int)$targetField->ID, // ID поля из шага 1
            'field' => [
                'settings' => array_merge(
                    (array)$targetField->SETTINGS, // Переносим текущие настройки из шага 1
                    ['PRECISION' => 3] // Количество знаков после запятой
                )
            ]
        ]
    )->getResponseData()->getResult()['field'];

    echo $updatedField['id'] . ': ' . $updatedField['settings']['PRECISION'];
    ```

- Python

    ```python
    updated_field = client.userfieldconfig.update(
        module_id="crm",
        bitrix_id=int(target_field["ID"]),
        field={
            "settings": {
                **target_field["SETTINGS"],  # Переносим текущие настройки из шага 1
                "PRECISION": 3,
            }
        },
    ).response.result["field"]

    print(updated_field["id"], updated_field["settings"]["PRECISION"])
    ```

- Go

    ```go
    // settings ЗАМЕНЯЮТСЯ целиком, а не дописываются. Если передать один
    // PRECISION, остальные настройки типа «Число» сбросятся на значения по
    // умолчанию — поэтому берём настройки из шага 1 и правим в них одну.
    settings := fields[target].Settings
    settings["PRECISION"] = 5

    res, err = core.Call(ctx, "userfieldconfig.update", b24.Params{
    	"moduleId": "crm",
    	"id":       fields[target].ID,
    	"field":    b24.Params{"settings": settings},
    })
    if err != nil {
    	return fmt.Errorf("userfieldconfig.update: %w", err)
    }

    var updated struct {
    	Field struct {
    		ID       b24.ID         `json:"id"`
    		Settings map[string]any `json:"settings"`
    	} `json:"field"`
    }
    if err := json.Unmarshal(res.Result, &updated); err != nil {
    	return fmt.Errorf("разбор изменённого поля: %w", err)
    }
    ```

{% endlist %}

В результате получим данные измененного поля.

```JSON
{
    "result": {
        "field": {
            "id": "6807",
            "entityId": "CRM_DEAL",
            "fieldName": "UF_CRM_1723464314",
            "userTypeId": "double",
            "xmlId": null,
            "sort": "150",
            "multiple": "N",
            "mandatory": "N",
            "showFilter": "E",
            "showInList": "Y",
            "editInList": "Y",
            "isSearchable": "N",
            "settings": {
                "PRECISION": 3,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            },
            "languageId": {
                "ru": "ru"
            },
            "editFormLabel": {
                "ru": "Сумма к возврату"
            },
            "listColumnLabel": {
                "ru": "Сумма к возврату"
            },
            "listFilterLabel": {
                "ru": "Сумма к возврату"
            },
            "errorMessage": {
                "ru": null
            },
            "helpMessage": {
                "ru": null
            }
        }
    }
}
```

Метод вернул поле в camelCase, поэтому новая точность лежит в `settings.PRECISION`, а не в `SETTINGS.PRECISION`, как в ответе шага 1. Значение изменилось с `2` на `3` — сценарий выполнен.

В `languageId` перечислены языки, для которых у поля заданы подписи, — их набор задается при создании и изменении поля, а не порталом. Поэтому у поля из примера только `ru`, а у поля, созданного в первом сценарии с `editFormLabel` на двух языках, будут `ru` и `en`. От фильтра `LANG` из шага 1 набор языков не зависит.

## Пример кода {#example}

Пример собирает второй сценарий целиком: находит поле сделки по названию и меняет его точность. Название поля задано константой в начале — замените ее на название своего поля.

{% list tabs %}

- JS
  
    ```JavaScript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const FIELD_LABEL = 'Сумма к возврату' // Название поля, которое нужно изменить
    const PRECISION = 3 // Количество знаков после запятой

    async function updateUserField() {
        try {
            // Шаг 1: получаем пользовательские поля сделок типа double
            const listResponse = await $b24.actions.v2.call.make({
                method: 'crm.deal.userfield.list',
                params: {
                    filter: {
                        LANG: 'ru', // Фильтр по языку для вывода названия поля
                        USER_TYPE_ID: 'double' // Фильтр по типу поля
                    }
                },
                requestId: 'userfield-list'
            });

            if (!listResponse.isSuccess) {
                throw new Error(listResponse.getErrorMessages().join('; '))
            }

            // Ответ crm.deal.userfield.list приходит в UPPER_SNAKE
            const targetField = listResponse.getData().result
                .find(field => field.EDIT_FORM_LABEL === FIELD_LABEL);

            if (!targetField) {
                throw new Error('Поле с указанным названием не найдено')
            }

            // Шаг 2: обновляем настройки найденного поля
            const updateResponse = await $b24.actions.v2.call.make({
                method: 'userfieldconfig.update',
                params: {
                    moduleId: 'crm', // Идентификатор модуля
                    id: Number(targetField.ID), // ID найденного пользовательского поля
                    field: {
                        settings: {
                            ...targetField.SETTINGS, // Переносим текущие настройки поля
                            PRECISION // Количество знаков после запятой
                        }
                    }
                },
                requestId: 'userfieldconfig-update'
            });

            if (!updateResponse.isSuccess) {
                throw new Error(updateResponse.getErrorMessages().join('; '))
            }

            // Ответ userfieldconfig.update приходит в camelCase
            console.log('Точность поля:', updateResponse.getData().result.field.settings.PRECISION);
        } catch (error) {
            console.error(error);
        }
    }

    updateUserField();
    ```

- PHP
  
    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Bitrix24\SDK\Services\ServiceBuilder;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    const FIELD_LABEL = 'Сумма к возврату'; // Название поля, которое нужно изменить
    const PRECISION = 3; // Количество знаков после запятой

    function updateUserField(ServiceBuilder $sb, string $fieldLabel, int $precision): void {
        try {
            // Шаг 1: получаем пользовательские поля сделок типа double
            $fields = $sb->getCRMScope()->dealUserfield()->list(
                order: [],
                filter: [
                    'LANG' => 'ru', // Фильтр по языку для вывода названия поля
                    'USER_TYPE_ID' => 'double' // Фильтр по типу поля
                ]
            )->getUserfields();

            // Ответ crm.deal.userfield.list приходит в UPPER_SNAKE
            $targetField = null;
            foreach ($fields as $field) {
                if ($field->EDIT_FORM_LABEL === $fieldLabel) {
                    $targetField = $field;
                    break;
                }
            }

            if ($targetField === null) {
                throw new \RuntimeException('Поле с указанным названием не найдено');
            }

            // Шаг 2: обновляем настройки найденного поля
            // у userfieldconfig.update нет типизированной обертки в SDK — вызываем метод через ядро
            $updatedField = $sb->core->call(
                'userfieldconfig.update',
                [
                    'moduleId' => 'crm', // Идентификатор модуля
                    'id' => (int)$targetField->ID, // ID найденного пользовательского поля
                    'field' => [
                        'settings' => array_merge(
                            (array)$targetField->SETTINGS, // Переносим текущие настройки поля
                            ['PRECISION' => $precision] // Количество знаков после запятой
                        )
                    ]
                ]
            )->getResponseData()->getResult()['field'];

            // Ответ userfieldconfig.update приходит в camelCase
            echo 'Точность поля: ' . $updatedField['settings']['PRECISION'];
        } catch (\Throwable $e) {
            echo 'Ошибка: ' . $e->getMessage();
        }
    }

    updateUserField($sb, FIELD_LABEL, PRECISION);
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError


    FIELD_LABEL = "Сумма к возврату"  # Название поля, которое нужно изменить
    PRECISION = 3  # Количество знаков после запятой


    def update_user_field(client, field_label: str, precision: int) -> None:
        try:
            # Шаг 1: получаем пользовательские поля сделок типа double
            fields = client.crm.deal.userfield.list(
                filter={
                    "LANG": "ru",
                    "USER_TYPE_ID": "double",
                }
            ).response.result

            # Ответ crm.deal.userfield.list приходит в UPPER_SNAKE
            target_field = next(
                (field for field in fields if field["EDIT_FORM_LABEL"] == field_label),
                None,
            )

            if target_field is None:
                raise RuntimeError("Поле с указанным названием не найдено")

            # Шаг 2: обновляем настройки найденного поля
            updated_field = client.userfieldconfig.update(
                module_id="crm",
                bitrix_id=int(target_field["ID"]),
                field={
                    "settings": {
                        **target_field["SETTINGS"],  # Переносим текущие настройки поля
                        "PRECISION": precision,
                    }
                },
            ).response.result["field"]
        except (BitrixAPIError, RuntimeError) as error:
            print(f"Ошибка: {error}")
        else:
            # Ответ userfieldconfig.update приходит в camelCase
            print("Точность поля:", updated_field["settings"]["PRECISION"])


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    update_user_field(client, FIELD_LABEL, PRECISION)
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
    // Пример самодостаточный: он создаёт поле сделки с точностью 2, находит его по
    // названию, меняет точность на 3 и удаляет поле за собой. Второй сценарий
    // страницы требует уже существующего поля — пример готовит его первым
    // сценарием, поэтому запускается на любом портале, ничего править не нужно.
    package main

    import (
    	"context"
    	"encoding/json"
    	"errors"
    	"fmt"
    	"log"
    	"os"

    	b24 "github.com/bitrix24/b24gosdk"
    )

    const (
    	fieldName  = "UF_CRM_DEAL_NEW_DOUBLE_FIELD"
    	fieldLabel = "Число с округлением"
    )

    func main() {
    	if err := run(context.Background()); err != nil {
    		log.Fatal(err)
    	}
    }

    func run(ctx context.Context) error {
    	// Путь вебхука — это секрет, поэтому он приходит из окружения, а не из кода.
    	// Клиент строится один раз на портал: он держит HTTP-клиент и состояние
    	// авторизации.
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()
    	// --- сценарий 1: создаём поле сразу с точностью
    	res, err := core.Call(ctx, "userfieldconfig.add", b24.Params{
    		"moduleId": "crm",
    		"field": b24.Params{
    			"entityId":   "CRM_DEAL",
    			"fieldName":  fieldName,
    			"userTypeId": "double",
    			"editFormLabel": b24.Params{
    				"ru": fieldLabel,
    				"en": "PRECISION double",
    			},
    			// Параметр необязательный, но для типа «Число» его лучше
    			// передавать: без него точность будет 0 и значения округлятся
    			// до целых.
    			"settings": b24.Params{"PRECISION": 3},
    		},
    	})
    	if err != nil {
    		// Код ошибки сравнивается через errors.Is, а не строкой: опечатка в
    		// литерале скомпилируется и молча уведёт в другую ветку.
    		if errors.Is(err, b24.ErrAccessDenied) {
    			return fmt.Errorf("нужно право «Разрешить изменять настройки» в CRM: %w", err)
    		}
    		return fmt.Errorf("userfieldconfig.add: %w", err)
    	}

    	// Метод заворачивает ответ в объект с ключом field и отвечает в camelCase:
    	// точность лежит в settings.PRECISION, а не в SETTINGS.PRECISION.
    	var added struct {
    		Field struct {
    			ID       b24.ID         `json:"id"`
    			Settings map[string]any `json:"settings"`
    		} `json:"field"`
    	}
    	if err := json.Unmarshal(res.Result, &added); err != nil {
    		return fmt.Errorf("разбор созданного поля: %w", err)
    	}
    	defer del(ctx, core, "userfieldconfig.delete", b24.Params{
    		"moduleId": "crm", "id": added.Field.ID,
    	})
    	fmt.Printf("поле %d создано, PRECISION=%v\n", added.Field.ID, added.Field.Settings["PRECISION"])

    	// --- сценарий 2, шаг 1: находим поле по названию
    	// Без фильтра LANG названия не возвращаются вовсе, и найти поле по названию
    	// не получится.
    	res, err = core.Call(ctx, "crm.deal.userfield.list", b24.Params{
    		"filter": b24.Params{"LANG": "ru", "USER_TYPE_ID": "double"},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.deal.userfield.list: %w", err)
    	}

    	// А этот метод отвечает в UPPER_SNAKE — те же данные, другой регистр.
    	// Ключи внутри самих настроек в обоих случаях в верхнем регистре.
    	var fields []struct {
    		ID            b24.ID         `json:"ID"`
    		FieldName     string         `json:"FIELD_NAME"`
    		EditFormLabel string         `json:"EDIT_FORM_LABEL"`
    		Settings      map[string]any `json:"SETTINGS"`
    	}
    	if err := json.Unmarshal(res.Result, &fields); err != nil {
    		return fmt.Errorf("разбор пользовательских полей: %w", err)
    	}

    	target := -1
    	for i, f := range fields {
    		if f.EditFormLabel == fieldLabel {
    			target = i
    			break
    		}
    	}
    	if target < 0 {
    		return fmt.Errorf("поле %q не найдено", fieldLabel)
    	}
    	fmt.Printf("нашли поле %d (%s), сейчас PRECISION=%v\n",
    		fields[target].ID, fields[target].FieldName, fields[target].Settings["PRECISION"])

    	// --- сценарий 2, шаг 2: меняем точность
    	// settings ЗАМЕНЯЮТСЯ целиком, а не дописываются. Если передать один
    	// PRECISION, остальные настройки типа «Число» сбросятся на значения по
    	// умолчанию — поэтому берём настройки из шага 1 и правим в них одну.
    	settings := fields[target].Settings
    	settings["PRECISION"] = 5

    	res, err = core.Call(ctx, "userfieldconfig.update", b24.Params{
    		"moduleId": "crm",
    		"id":       fields[target].ID,
    		"field":    b24.Params{"settings": settings},
    	})
    	if err != nil {
    		return fmt.Errorf("userfieldconfig.update: %w", err)
    	}

    	var updated struct {
    		Field struct {
    			ID       b24.ID         `json:"id"`
    			Settings map[string]any `json:"settings"`
    		} `json:"field"`
    	}
    	if err := json.Unmarshal(res.Result, &updated); err != nil {
    		return fmt.Errorf("разбор изменённого поля: %w", err)
    	}
    	fmt.Printf("поле %d: PRECISION=%v, остальные настройки сохранены: %v\n",
    		updated.Field.ID, updated.Field.Settings["PRECISION"], updated.Field.Settings)
    	return nil
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

## Проверим результат {#check}

Сценарий выполнен верно, если в ответе метода:

- [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) есть `field.id`, а в `field.settings.PRECISION` стоит переданная точность
- [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md) в `field.settings.PRECISION` стоит новая точность, а `field.id` совпадает с идентификатором из шага 1

Актуальные настройки поля в любой момент возвращает метод [userfieldconfig.get](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-get.md) с параметрами `moduleId`: `crm` и `id` поля. Он отдает данные в том же camelCase, что `add` и `update`.

Проверить округление на данных можно так: откройте карточку сделки — поле отображается с названием из `editFormLabel`. Введите значение с большим числом знаков после запятой, чем задано в `PRECISION`, и сохраните сделку. Через REST то же самое делают методы [crm.deal.update](../../../api-reference/crm/deals/crm-deal-update.md) и [crm.deal.get](../../../api-reference/crm/deals/crm-deal-get.md): запишите в поле `1,23456` и прочитайте его — при `PRECISION`: `3` вернется `1.235`.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Ошибка** | **Причина и действие** ||
|| `Вы не можете создавать пользовательские поля` | У пользователя нет права «Разрешить изменять настройки» в CRM, либо в `field[entityId]` передан объект, к настройкам которого нет доступа, либо тип поля из `field[userTypeId]` запрещено создавать через REST. Проверьте, от имени какого пользователя создан вебхук ||
|| `Некорректный код поля` | `field[fieldName]` не начинается с `UF_` и идентификатора объекта из `field[entityId]`. Для `CRM_DEAL` код должен начинаться с `UF_CRM_DEAL_`. Префикс сверяется с учетом регистра, поэтому `uf_crm_deal_...` не подойдет. Эта же ошибка приходит, если `field[fieldName]` вовсе не передан. Если префикс верный, но в коде есть строчные буквы, кириллица или символы вне `A-Z`, `0-9` и `_`, придет `Имя поля содержит недопустимые символы...`, а если код длиннее 50 символов — `Имя поля слишком длинное...` ||
|| `Поле #FIELD_NAME# для объекта #ENTITY_ID# уже существует.` | Поле с таким `field[fieldName]` у объекта уже есть, вместо `#FIELD_NAME#` и `#ENTITY_ID#` подставляются переданные значения. Создавать поле заново не нужно — перейдите ко [второму сценарию](#update) и измените точность у существующего поля ||
|| `Вы не можете изменить настройки пользьовательского поля` | Недостаточно прав на изменение поля. Эта же ошибка приходит, если поле с переданным `id` удалено или принадлежит другому модулю, чем указан в `moduleId`. Опечатка в слове «пользьовательского» — на стороне Битрикс24, ищите ошибку по этой строке как есть ||
|| `The current method required more scopes. (crm)` | У вебхука или приложения нет scope модуля из `moduleId`. Для CRM нужны оба scope: `userfieldconfig` и `crm` ||
|| `Access denied.` | Ошибка [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md): у пользователя нет права на чтение сделок ||
|#

Метод может отработать без ошибки, но результат окажется не тем, что ожидали.

- в ответе [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) нет названий полей — в `filter` не передан `LANG`. Без него подписи не возвращаются вовсе, и поиск поля по названию не сработает
- поле в ответе не нашлось — проверьте `USER_TYPE_ID`: у типа «Число» это `double`, а не `integer` и не `money`
- точность изменилась, а другие настройки поля сбросились — в `field[settings]` был передан только `PRECISION`. Повторите шаг 2, передав настройки из шага 1 целиком
- значение в поле не округлилось — округление применяется при сохранении значения, а не при изменении настройки. Уже сохраненные значения не пересчитываются

Шаги второго сценария повторяются независимо: шаг 1 ничего не меняет, его можно выполнять сколько угодно раз. Если ошибку вернул шаг 2, настройка не изменилась — исправьте параметры и повторите только его.

## Что важно учитывать

- `PRECISION` принимает целое число от 0 до 12. Значения вне диапазона Битрикс24 не отклоняет, а приводит к границе: отрицательное станет `0`, больше 12 — `12`
- значение поля принимается и с точкой, и с запятой, пробелы удаляются
- `MIN_VALUE` и `MAX_VALUE`, равные `0`, означают, что ограничения нет
- [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md) не меняет `entityId`, `fieldName`, `userTypeId` и `multiple` — эти параметры игнорируются. Чтобы изменить их, удалите поле методом [userfieldconfig.delete](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-delete.md) и создайте заново
- языковые подписи `update` перезаписывает так же, как настройки: если передать `field[editFormLabel]` хотя бы с одним языком, подписи на остальных языках удалятся. В примерах этой страницы подписи не передаются, поэтому они сохраняются
- методы `userfieldconfig.*` работают не только с CRM. Для полей другого модуля меняются `moduleId` и `entityId`, а точность у типа `double` задается той же настройкой `PRECISION`
- если нужен один регистр полей на весь сценарий, вместо [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) подойдет [userfieldconfig.list](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-list.md): он возвращает camelCase, как `add` и `update`. У него другие правила вызова: обязателен `moduleId`, список полей приходит в `result.fields`, а не в корне `result`, и названия полей вернутся только если передать в `select` ключ `language` — это аналог фильтра `LANG` из шага 1

## Продолжите изучение

- [{#T}](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md)
- [{#T}](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md)
- [{#T}](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-list.md)
- [{#T}](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-get.md)
- [{#T}](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md)
- [{#T}](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-settings-fields.md)
- [{#T}](../../../api-reference/crm/universal/userfieldconfig/index.md)
- [{#T}](./how-to-add-user-field-to-spa.md)
