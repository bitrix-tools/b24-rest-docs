# Как добавить шаблон и создать документ на его основе

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны оба права — на изменение шаблонов и на изменение документов генератора документов
>
> - [crm.documentgenerator.numerator.add](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-add.md) и [crm.documentgenerator.template.add](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md) — пользователь с правом на изменение шаблонов генератора документов
> - [crm.documentgenerator.document.add](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-add.md) — пользователь с правом на изменение документов генератора документов
> - [crm.documentgenerator.document.get](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-get.md) — пользователь с правом на просмотр документов генератора документов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Генератор документов собирает печатную форму по шаблону `.docx` и данным объекта CRM. Через REST все три шага — создание нумератора, загрузку шаблона и генерацию документа — можно выполнить скриптом.

Нумератор задает, как считаются номера документов, поэтому его создают первым: без него шаблон не сохранится. Шаблон хранит файл и список объектов, для которых он доступен. Документ создается по готовому шаблону для одного объекта, поэтому он идет последним.

В результате сценария в карточке сделки появится документ с номером из нумератора, а метод вернет ссылку на его скачивание.

Сценарий состоит из трех шагов. Шаги 1 и 2 настраивают генератор и выполняются один раз, шаг 3 повторяется для каждой новой сделки с уже готовым `templateId`.

1. Создать нумератор методом [crm.documentgenerator.numerator.add](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-add.md) и получить его `id`
2. Загрузить шаблон методом [crm.documentgenerator.template.add](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md), передав `id` нумератора и файл в Base64, и получить `id` шаблона
3. Сгенерировать документ методом [crm.documentgenerator.document.add](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-add.md), передав `id` шаблона и идентификатор сделки

## Что нужно до начала

- вебхук создан от имени пользователя, у которого есть права на изменение шаблонов и документов генератора документов. Для проверки результата нужно еще право на просмотр документов

- в правах вебхука отмечен scope `crm`

- путь вебхука дает полный доступ в рамках своего scope. Храните путь в переменной окружения и не публикуйте его в открытом коде

- на диске рядом со скриптом лежит файл шаблона `.docx` с полями генератора документов

- в Битрикс24 есть сделка, для которой создается документ, и вы знаете ее `id`. Найти сделку можно методом [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) с `entityTypeId`: `2`

- в Битрикс24 доступен модуль генератора документов, а тариф позволяет создавать документы

Поля в файле шаблона записываются в фигурных скобках, например `{DocumentNumber}` — номер документа, `{DocumentCreateTime}` — дата генерации, `{TotalSum}` — общая сумма. Файл без полей загрузится, но документ по нему получится пустым.

В примерах используются три значения. Замените их своими.

- `templatePath` — путь к файлу шаблона, в примере `template.docx`

- `templateName` — название шаблона, в примере `Демонстрационная реализация товара`

- `dealId` — идентификатор сделки, в примере `8287`

## 1. Создадим нумератор

Используем метод [crm.documentgenerator.numerator.add](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-add.md). Метод принимает объект `fields` с параметрами:

- `name` — название нумератора, обязательный параметр. Укажем `Нумератор из REST`

- `template` — шаблон номера, обязательный параметр. Укажем `{NUMBER}` — эту переменную генератор заменит на порядковый номер документа. В шаблоне номера можно комбинировать переменные, например `{DAY}` — текущий день, `{CLIENT_ID}` — идентификатор клиента, `{RANDOM}` — случайное число

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { readFile } from 'node:fs/promises'
    import { basename } from 'node:path'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const templatePath = 'template.docx'; // путь к файлу шаблона
    const templateName = 'Демонстрационная реализация товара'; // название шаблона
    const dealId = 8287; // идентификатор сделки

    const resNum = await $b24.actions.v2.call.make({
        method: 'crm.documentgenerator.numerator.add',
        params: {
            fields: {
                name: 'Нумератор из REST', // Название нумератора
                template: '{NUMBER}' // Шаблон номера документа
            }
        },
        requestId: 'numerator-add'
    });

    const numeratorId = resNum.getData().result.numerator.id;
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

    $templatePath = __DIR__ . '/template.docx'; // путь к файлу шаблона
    $templateName = 'Демонстрационная реализация товара'; // название шаблона
    $dealId = 8287; // идентификатор сделки

    $resNum = $sb->getCRMScope()->documentgeneratorNumerator()->add(
        [
            'name' => 'Нумератор из REST', // Название нумератора
            'template' => '{NUMBER}', // Шаблон номера документа
        ]
    );

    $numeratorId = $resNum->getId();
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

    template_path = "template.docx"  # путь к файлу шаблона
    template_name = "Демонстрационная реализация товара"  # название шаблона
    deal_id = 8287  # идентификатор сделки

    numerator = client.crm.documentgenerator.numerator.add(
        fields={
            "name": "Нумератор из REST",  # Название нумератора
            "template": "{NUMBER}",  # Шаблон номера документа
        },
    ).response.result["numerator"]

    numerator_id = numerator["id"]
    ```

{% endlist %}

В ответе метод вернет объект `numerator`. Сохраните `id` — его нужно передать в шаг 2. В примере `id`: `1095`.

```json
{
    "result": {
        "numerator": {
            "name": "Нумератор из REST",
            "template": "{NUMBER}",
            "id": 1095,
            "code": null,
            "settings": {
                "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
                    "start": 1,
                    "step": 1,
                    "length": 0,
                    "padString": "0",
                    "periodicBy": null,
                    "timezone": null,
                    "isDirectNumeration": false
                }
            }
        }
    }
}
```

## 2. Загрузим шаблон документа

Используем метод [crm.documentgenerator.template.add](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md).

{% note warning "" %}

Содержимое файла шаблона нужно преобразовать в формат [Base64](../../../api-reference/files/how-to-upload-files.md).

{% endnote %}

Метод принимает объект `fields` с параметрами:

- `name` — название шаблона, обязательный параметр. Передадим значение `templateName`

- `numeratorId` — идентификатор нумератора, обязательный параметр. Возьмем `id` из ответа шага 1, в примере `1095`

- `region` — регион шаблона, обязательный параметр. Влияет на локализацию, например на формат валюты и даты. Укажем `ru`. Список регионов вашего Битрикс24 возвращает метод [documentgenerator.region.list](../../../api-reference/document-generator/region/document-generator-region-list.md) — ему нужен отдельный scope `documentgenerator`

- `entityTypeId` — массив [идентификаторов типов объектов CRM](../../../api-reference/crm/data-types.md#object_type), для которых доступен шаблон, обязательный параметр. Укажем `2` — сделка. Полный список типов возвращает метод [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)

- `file` — файл шаблона в формате `["имя_файла.docx", "base64-контент"]`, обязательный параметр. Первый элемент массива задает имя, под которым файл сохранится в Битрикс24, второй — содержимое файла в Base64. Имя берем из `templatePath`, чтобы оно не разошлось с именем загружаемого файла

- `users` — массив кодов прав доступа, необязательный параметр. Определяет, кто видит шаблон и может им пользоваться. Укажем `UA` — код доступа для всех авторизованных пользователей. Чтобы сузить доступ, передайте вместо `UA` коды конкретных пользователей или групп

{% list tabs %}

- JS

    ```javascript
    const fileContent = (await readFile(templatePath)).toString('base64');

    const resTemplate = await $b24.actions.v2.call.make({
        method: 'crm.documentgenerator.template.add',
        params: {
            fields: {
                name: templateName, // Название шаблона
                numeratorId: numeratorId, // Идентификатор нумератора из шага 1
                region: 'ru', // Регион шаблона
                users: ['UA'], // Права доступа: все авторизованные пользователи
                entityTypeId: ['2'], // 2 — сделка
                file: [basename(templatePath), fileContent] // Имя файла и контент в Base64
            }
        },
        requestId: 'template-add'
    });

    const templateId = resTemplate.getData().result.template.id;
    ```

- PHP

    ```php
    $fileContent = base64_encode(file_get_contents($templatePath));

    $resTemplate = $sb->getCRMScope()->documentgeneratorTemplate()->add(
        [
            'name' => $templateName, // Название шаблона
            'numeratorId' => $numeratorId, // Идентификатор нумератора из шага 1
            'region' => 'ru', // Регион шаблона
            'users' => ['UA'], // Права доступа: все авторизованные пользователи
            'entityTypeId' => ['2'], // 2 — сделка
            'file' => [basename($templatePath), $fileContent] // Имя файла и контент в Base64
        ]
    );

    $templateId = $resTemplate->getId();
    ```

- Python

    ```python
    import base64
    from pathlib import Path

    with open(template_path, "rb") as file:
        file_content = base64.b64encode(file.read()).decode("ascii")

    template = client.crm.documentgenerator.template.add(
        fields={
            "name": template_name,  # Название шаблона
            "numeratorId": numerator_id,  # Идентификатор нумератора из шага 1
            "region": "ru",  # Регион шаблона
            "users": ["UA"],  # Права доступа: все авторизованные пользователи
            "entityTypeId": ["2"],  # 2 — сделка
            "file": [Path(template_path).name, file_content],  # Имя файла и контент в Base64
        },
    ).response.result["template"]

    template_id = int(template["id"])
    ```

{% endlist %}

В ответе метод вернет объект `template`. Сохраните `id` — его нужно передать в шаг 3. В примере `id`: `249`.

```json
{
    "result": {
        "template": {
            "id": "249",
            "name": "Демонстрационная реализация товара",
            "region": "ru",
            "code": null,
            "download": "https://your-domain.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.template.download&SITE_ID=s1&id=249",
            "active": "Y",
            "moduleId": "crm",
            "numeratorId": "1095",
            "withStamps": "N",
            "users": {
                "UA": "UA"
            },
            "isDeleted": "N",
            "sort": "500",
            "createTime": "2026-08-19T14:55:23+03:00",
            "updateTime": "2026-08-19T14:55:23+03:00",
            "entityTypeId": [
                "2"
            ],
            "downloadMachine": "https://your-domain.bitrix24.ru/rest/crm.documentgenerator.template.download.json?..."
        }
    }
}
```

Идентификатор нумератора вернулся в поле `numeratorId` строкой — это тот же нумератор, который создан на шаге 1. Типы значений в ответе расходятся:

- собственный `id` шаблона тоже приходит строкой: в `templateId` шага 3 его можно передать как есть или привести к числу

- массив `entityTypeId` шаблона хранит строки, а документ на шаге 3 принимает число

Имена полей, которые шаблон подставит в документ, возвращает метод [crm.documentgenerator.template.getfields](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-get-fields.md) по `id` из этого ответа. Сверьте этот список с полями в файле `.docx`, если документ получается пустым.

## 3. Сгенерируем документ

Соберем документ по шаблону и данным сделки методом [crm.documentgenerator.document.add](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-add.md) с параметрами:

- `templateId` — идентификатор шаблона, обязательный параметр. Возьмем `id` из ответа шага 2, в примере `249`

- `entityTypeId` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type), обязательный параметр. Укажем `2` — сделка. Значение должно входить в массив `entityTypeId` шаблона, иначе документ не создастся

- `entityId` — идентификатор объекта, обязательный параметр. Передадим значение `dealId` — документ соберется по данным этой сделки

{% note warning "" %}

Метод не проверяет, существует ли объект. Если передать `entityId` несуществующей сделки, документ все равно создастся: ошибки не будет, но поля сделки в нем останутся пустыми, а номер нумератора будет израсходован. Убедитесь, что сделка существует, до вызова.

{% endnote %}

{% list tabs %}

- JS

    ```javascript
    const resDoc = await $b24.actions.v2.call.make({
        method: 'crm.documentgenerator.document.add',
        params: {
            templateId: templateId, // Идентификатор шаблона из шага 2
            entityTypeId: 2, // 2 — сделка
            entityId: dealId // Идентификатор сделки
        },
        requestId: 'document-add'
    });

    const documentId = resDoc.getData().result.document.id;
    ```

- PHP

    ```php
    $resDoc = $sb->getCRMScope()->documentgeneratorDocument()->add(
        $templateId, // Идентификатор шаблона из шага 2
        2, // 2 — сделка
        $dealId // Идентификатор сделки
    );

    $documentId = $resDoc->getId();
    ```

- Python

    ```python
    document = client.crm.documentgenerator.document.add(
        template_id=template_id,  # Идентификатор шаблона из шага 2
        entity_type_id=2,  # 2 — сделка
        entity_id=deal_id,  # Идентификатор сделки
    ).response.result["document"]

    document_id = document["id"]
    ```

{% endlist %}

В ответе метод вернет объект `document`. Ответ сокращен, показаны поля, которые подтверждают результат.

```json
{
    "result": {
        "document": {
            "id": 1919,
            "title": "Демонстрационная реализация товара 1",
            "number": "1",
            "templateId": "249",
            "entityTypeId": "2",
            "entityId": 8287,
            "createTime": "2026-08-19T14:55:42+03:00",
            "createdBy": 1,
            "publicUrl": null,
            "downloadUrl": "https://your-domain.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.download&SITE_ID=s1&id=1919",
            "downloadUrlMachine": "https://your-domain.bitrix24.ru/rest/crm.documentgenerator.document.download.json?...",
            "products": {
                "currencyId": "RUB",
                "totalSum": "0.00",
                "totalRows": 0
            }
        }
    }
}
```

Поле `title` собрано из названия шаблона и номера `1`, который выдал нумератор. Ссылка `downloadUrl` открывает документ в браузере, `downloadUrlMachine` отдает файл при скачивании из приложения. Поле `publicUrl` пустое: публичную ссылку включает отдельный метод [crm.documentgenerator.document.enablepublicurl](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-enable-public-url.md).

## Проверим результат

Откройте карточку сделки в Битрикс24 — новый документ появится в списке документов сделки под названием из поля `title`. Оттуда его можно скачать или отправить клиенту.

Через REST документ возвращает метод [crm.documentgenerator.document.get](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-get.md) по идентификатору из шага 3.

{% list tabs %}

- JS

    ```javascript
    const checkResult = await $b24.actions.v2.call.make({
        method: 'crm.documentgenerator.document.get',
        params: { id: documentId },
        requestId: 'document-get'
    });

    console.dir(checkResult.getData().result.document);
    ```

- PHP

    ```php
    $checkResult = $sb->getCRMScope()->documentgeneratorDocument()->get($documentId);

    print_r($checkResult->document());
    ```

- Python

    ```python
    check_result = client.crm.documentgenerator.document.get(
        int(document_id),
    ).response.result["document"]

    print(check_result)
    ```

{% endlist %}

Сценарий выполнен, если в ответе есть непустые поля `id` и `downloadUrl`, а `templateId` совпадает с идентификатором шаблона из шага 2. Поле `number` показывает номер, который выдал нумератор: у первого документа это `1`, у следующего — `2`.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Текст ошибки** | **Причина и действие** ||
|| `Empty required fields: template` | В шаге 1 не передан шаблон номера `template` ||
|| `Empty required fields: name, numeratorId, region, entityTypeId` | В шаге 2 не переданы обязательные поля объекта `fields`. В сообщении перечислены только те, которых не хватает ||
|| `Missing file content` | В шаге 2 не передано содержимое файла в `fields.file`. Проверьте, что файл шаблона существует и прочитан до вызова ||
|| `Could not save file` | Не удалось сохранить файл шаблона. Проверьте, что в Base64 попал файл `.docx` целиком, без переносов строк и префикса `data:` ||
|| `You do not have permissions to modify templates` | У пользователя вебхука нет права изменять шаблоны генератора документов ||
|| `Шаблон не найден` | В шаге 3 передан `templateId` несуществующего или удаленного шаблона ||
|| `No provider for entityTypeId` | В шаге 3 передан `entityTypeId`, для которого нет источника данных. Для сделки это `2` ||
|| `Empty required parameter "value"` | В шаге 3 не передан `entityId` или он пустой ||
|| `Cannot create document` | Документ не собрался по шаблону. Частая причина — файл не в формате `.docx` ||
|| Документ создан, но поля сделки пустые | Ошибки нет. В `entityId` передана несуществующая сделка или в шаблоне указаны имена полей, которых нет у объекта ||
|| `DOCGEN_ACCESS_ERROR` | У пользователя вебхука нет права изменять документы генератора документов ||
|| `DOCGEN_LIMIT_ERROR` | Достигнут лимит количества документов на тарифе ||
|| `Module documentgenerator is not installed` | В Битрикс24 недоступен модуль генератора документов ||
|#

Шаги выполняются по цепочке, поэтому повторяйте только упавший шаг и те, что идут за ним. Если ошибку вернул шаг 2, нумератор уже создан — берите его `id` из ответа шага 1, а не создавайте новый. Если ошибку вернул шаг 3, шаблон уже загружен и повторять шаги 1 и 2 не нужно.

## Что важно учитывать

- если запускать все три шага повторно, в настройках CRM накопятся дубликаты нумераторов и шаблонов. Готовые возвращают методы [crm.documentgenerator.numerator.list](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-list.md) и [crm.documentgenerator.template.list](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-list.md), лишние шаблоны удаляет [crm.documentgenerator.template.delete](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-delete.md)

- нумератор считает номера сквозным счетчиком. Документы, созданные по разным шаблонам с одним нумератором, продолжают общую нумерацию

- чтобы собирать документы по счетам или смарт-процессам, добавьте их идентификаторы в массив `entityTypeId` при загрузке шаблона или обновите шаблон методом [crm.documentgenerator.template.update](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-update.md)

## Пример кода

Скрипт последовательно создает нумератор, загружает шаблон и формирует документ по сделке. Каждый следующий вызов выполняется только после успешного предыдущего.

{% list tabs %}

- JS

    ```javascript
    import { readFile } from 'node:fs/promises'
    import { basename } from 'node:path'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const templatePath = 'template.docx'; // путь к файлу шаблона
    const templateName = 'Демонстрационная реализация товара'; // название шаблона
    const dealId = 8287; // идентификатор сделки

    async function createDocument() {
        try {
            const fileContent = (await readFile(templatePath)).toString('base64');

            const resNum = await $b24.actions.v2.call.make({
                method: 'crm.documentgenerator.numerator.add',
                params: {
                    fields: { name: 'Нумератор из REST', template: '{NUMBER}' }
                },
                requestId: 'numerator-add'
            });
            const numeratorId = resNum.getData().result.numerator.id;

            const resTemplate = await $b24.actions.v2.call.make({
                method: 'crm.documentgenerator.template.add',
                params: {
                    fields: {
                        name: templateName,
                        numeratorId: numeratorId,
                        region: 'ru',
                        users: ['UA'],
                        entityTypeId: ['2'],
                        file: [basename(templatePath), fileContent]
                    }
                },
                requestId: 'template-add'
            });
            const templateId = resTemplate.getData().result.template.id;

            const resDoc = await $b24.actions.v2.call.make({
                method: 'crm.documentgenerator.document.add',
                params: {
                    templateId: templateId,
                    entityTypeId: 2,
                    entityId: dealId
                },
                requestId: 'document-add'
            });

            const document = resDoc.getData().result.document;
            console.log('Документ создан:', document.title, document.downloadUrl);
        } catch (error) {
            console.error('Документ не создан:', error.message);
        }
    }

    createDocument();
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

    $templatePath = __DIR__ . '/template.docx'; // путь к файлу шаблона
    $templateName = 'Демонстрационная реализация товара'; // название шаблона
    $dealId = 8287; // идентификатор сделки

    try {
        if (!is_readable($templatePath)) {
            throw new \RuntimeException('Файл шаблона не найден: ' . $templatePath);
        }
        $fileContent = base64_encode(file_get_contents($templatePath));

        $resNum = $sb->getCRMScope()->documentgeneratorNumerator()->add(
            [
                'name' => 'Нумератор из REST',
                'template' => '{NUMBER}',
            ]
        );
        $numeratorId = $resNum->getId();

        $resTemplate = $sb->getCRMScope()->documentgeneratorTemplate()->add(
            [
                'name' => $templateName,
                'numeratorId' => $numeratorId,
                'region' => 'ru',
                'users' => ['UA'],
                'entityTypeId' => ['2'],
                'file' => [basename($templatePath), $fileContent]
            ]
        );
        $templateId = $resTemplate->getId();

        $resDoc = $sb->getCRMScope()->documentgeneratorDocument()->add(
            $templateId,
            2,
            $dealId
        );

        echo 'Документ создан: ' . $sb->getCRMScope()
            ->documentgeneratorDocument()
            ->get($resDoc->getId())
            ->document()
            ->title;
    } catch (\Throwable $e) {
        echo 'Документ не создан: ' . $e->getMessage();
    }
    ```

- Python

    ```python
    import base64
    from pathlib import Path

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    template_path = "template.docx"  # путь к файлу шаблона
    template_name = "Демонстрационная реализация товара"  # название шаблона
    deal_id = 8287  # идентификатор сделки

    try:
        with open(template_path, "rb") as file:
            file_content = base64.b64encode(file.read()).decode("ascii")
    except OSError as error:
        print(f"Файл шаблона не прочитан: {error}")
    else:
        try:
            numerator = client.crm.documentgenerator.numerator.add(
                fields={
                    "name": "Нумератор из REST",
                    "template": "{NUMBER}",
                },
            ).response.result["numerator"]

            template = client.crm.documentgenerator.template.add(
                fields={
                    "name": template_name,
                    "numeratorId": numerator["id"],
                    "region": "ru",
                    "users": ["UA"],
                    "entityTypeId": ["2"],
                    "file": [Path(template_path).name, file_content],
                },
            ).response.result["template"]

            document = client.crm.documentgenerator.document.add(
                template_id=int(template["id"]),
                entity_type_id=2,
                entity_id=deal_id,
            ).response.result["document"]
        except BitrixAPIError as error:
            print(f"Документ не создан: {error}")
        else:
            print(f"Документ создан: {document['title']} {document['downloadUrl']}")
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-add.md)
- [{#T}](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-list.md)
- [{#T}](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md)
- [{#T}](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-list.md)
- [{#T}](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-get-fields.md)
- [{#T}](../../../api-reference/document-generator/region/document-generator-region-list.md)
- [{#T}](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-add.md)
- [{#T}](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-get.md)
- [{#T}](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-enable-public-url.md)
- [{#T}](../../../api-reference/files/how-to-upload-files.md)
