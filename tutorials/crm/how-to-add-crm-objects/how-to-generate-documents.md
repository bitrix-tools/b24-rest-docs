# Как добавить шаблон и создать документ на его основе

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Автоматизировать работу с документами в CRM можно с помощью скрипта. Он будет выполнять полный цикл генерации документа: создавать нумератор, загружать шаблон в формате `.docx` и формировать документ по конкретной сделке.

Чтобы создать документ, последовательно выполним методы:

1. [crm.documentgenerator.numerator.add](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-add.md) — создадим нумератор документа,

2. [crm.documentgenerator.template.add](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md) — загрузим шаблон документа,

3. [crm.documentgenerator.document.add](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-add.md) — сгенерируем документ.

## Подготовим переменные

Определим основные переменные, которые будем использовать в процессе генерации документа.

-  `filePath` — путь к файлу шаблона. Укажем `template.docx`.

-  `iDealID` — идентификатор сделки. Создадим документ для сделки с идентификатором `1`.

-  `sDocName` — имя создаваемого документа. Укажем `Демонстрационная реализация товара`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

-  JS

   ```javascript
   let filePath = 'template.docx'; 
   let iDealID = 1; 
   let sDocName = 'Демонстрационная реализация товара';
   ```

-  PHP

   ```php
   $filePath = __DIR__ . '/template.docx';  
   $iDealID = 1;  
   $sDocName = 'Демонстрационная реализация товара';
   ```

- Python

   ```python
   file_path = "template.docx"
   deal_id = 1
   document_name = "Демонстрационная реализация товара"
   ```

{% endlist %}

## 1\. Создадим нумератор документа

Создадим нумератор для документов с помощью [crm.documentgenerator.numerator.add](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-add.md). В метод передадим два параметра.

-  `name` — название нумератора. Укажем `Rest Numerator`.

-  `template` — шаблон, по которому будет генерироваться номер документа. Укажем `{NUMBER}` — это переменная, которая будет заменена на порядковый номер. Можно использовать другие переменные, например, `{DAY}` —текущий день, `{CLIENT_ID}` — идентификатор клиента, `{RANDOM}` — случайный номер.

{% list tabs %}

-  JS

   ```javascript
   import { B24Hook } from '@bitrix24/b24jssdk'

   const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
   // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

   const resNum = await $b24.actions.v2.call.make({
       method: 'crm.documentgenerator.numerator.add',
       params: {
           fields: {
               'name': 'Нумератор из REST',
               'template': '{NUMBER}'
           }
       },
       requestId: 'numerator-add'
   });
   ```

-  PHP

   ```php
   // composer require bitrix24/b24phpsdk:"^3.0"
   require_once 'vendor/autoload.php';

   use Bitrix24\SDK\Services\ServiceBuilderFactory;
   use Symfony\Component\EventDispatcher\EventDispatcher;
   use Psr\Log\NullLogger;

   $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
       ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

   $resNum = $sb->getCRMScope()->documentgeneratorNumerator()->add(
       [
           'name' => 'Нумератор из REST',
           'template' => '{NUMBER}',
       ]
   );
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

   res_num = client.crm.documentgenerator.numerator.add(
       fields={
           "name": "Нумератор из REST",
           "template": "{NUMBER}",
       }
   ).response.result
   ```

{% endlist %}

Метод [crm.documentgenerator.numerator.add](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-add.md) вернет объект `resNum` с информацией о созданном нумераторе.

```json
"numerator":{
    "name":"Нумератор из REST",
    "template":"{NUMBER}",
    "id":43,
    "code":null,
    "settings":{
        "Bitrix_Main_Numerator_Generator_SequentNumberGenerator":{
            "start":1,
            "step":1,
            "length":0,
            "padString":"0",
            "periodicBy":null,
            "timezone":null,
            "isDirectNumeration":false
        }
    }
}
```

## 2\. Загрузим шаблон документа

Если нумератор создан, добавим шаблон документа с помощью метода [crm.documentgenerator.template.add](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md).

{% note warning "" %}

Содержимое файла шаблона нужно преобразовать в формат [Base64](../../../api-reference/files/how-to-upload-files.md).

{% endnote %}

В [crm.documentgenerator.template.add](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md) нужно передать следующие данные:

-  `name` — название шаблона. Укажем переменную `sDocName`.

-  `numeratorId` — идентификатор нумератора. Передадим его из объекта `resNum`, который получен на первом шаге.

-  `region` — регион шаблона. Влияет на локализацию, например, валюту и дату. Укажем `ru` — Россия.

-  `users` — массив прав доступа. Определяет, какие группы пользователей могут видеть и использовать шаблон. Укажем `UA` — все авторизованные пользователи.

-  `entityTypeId` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Укажем `2` — сделка. Полный список типов объектов можно получить с помощью метода [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md).

-  `file` — контент файла `filePath`, который преобразован в формат Base64.

{% list tabs %}

-  JS

   ```javascript
   function fileToBase64(filePath) {
       return new Promise((resolve, reject) => {
           fetch(filePath)
               .then(response => response.blob())
               .then(blob => {
                   let reader = new FileReader();
                   reader.onloadend = () => resolve(reader.result.split(',')[1]);
                   reader.onerror = reject;
                   reader.readAsDataURL(blob);
               });
       });
   }
   
   let fileContent = await fileToBase64(filePath);
   
   const resTemplate = await $b24.actions.v2.call.make({
       method: 'crm.documentgenerator.template.add',
       params: {
           fields: {
               'name': sDocName,
               'numeratorId': resNum.getData().result.numerator.id,
               'region': 'ru',
               'users': ['UA'],
               'entityTypeId': ['2'],
               'file': fileContent
           }
       },
       requestId: 'template-add'
   });
   ```

-  PHP

   ```php
   $resTemplate = $sb->getCRMScope()->documentgeneratorTemplate()->add(
       [
           'name' => $sDocName,
           'numeratorId' => $resNum->getId(), // crm.documentgenerator.numerator.add
           'region' => 'ru', // eu,de,ua,by,ru
           'users' => [
               'UA'//User All
           ],
           'entityTypeId' => ['2'], // 2 — сделка (crm.enum.ownertype)
           'file' => base64_encode(file_get_contents($filePath))
       ]
   );
   ```

- Python

   ```python
   import base64

   with open(file_path, "rb") as file:
       file_content = base64.b64encode(file.read()).decode("ascii")

   res_template = client.crm.documentgenerator.template.add(
       fields={
           "name": document_name,
           "numeratorId": res_num["numerator"]["id"],
           "region": "ru",
           "users": ["UA"],
           "entityTypeId": ["2"],
           "file": file_content,
       }
   ).response.result
   ```

{% endlist %}

Метод [crm.documentgenerator.template.add](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md) вернет объект `resTemplate` с информацией о шаблоне.

```json
template: { 
    "id": "39", 
    "name": "Демонстрационная реализация товара", 
    "region": "ru",
    "​​active": "Y",
    "​​code": null,
    "​​createTime": "2025-07-09T16:12:13+03:00",
    "​​download": "https://some-domain.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.template.download&SITE_ID=s1&id=39",
    "​​downloadMachine": "https://some-domain.bitrix24.ru/rest/crm.documentgenerator.template.download.json?sessid=c4ad892d7583ead4fd38666a0af85cb7&token=crm%7CYWN0aW9uPWNybS5kb2N1bWVudGdlbmVyYXRvci50ZW1wbGF0ZS5kb3dubG9hZCZTSVRFX0lEPXMxJmlkPTM5Jl89azNRNlFuVVRvUGl5VzNLaExTVDJCR3g1WjdyQ0tSSFA%3D%7CImNybS5kb2N1bWVudGdlbmVyYXRvci50ZW1wbGF0ZS5kb3dubG9hZHxjcm18WVdOMGFXOXVQV055YlM1a2IyTjFiV1Z1ZEdkbGJtVnlZWFJ2Y2k1MFpXMXdiR0YwWlM1a2IzZHViRzloWkNaVFNWUkZYMGxFUFhNeEptbGtQVE01Smw4OWF6TlJObEZ1VlZSdlVHbDVWek5MYUV4VFZESkNSM2cxV2pkeVEwdFNTRkE9fGM0YWQ4OTJkNzU4M2VhZDRmZDM4NjY2YTBhZjg1Y2I3Ig%3D%3D.GMgjAbCT099xlo8CJN9n5mP2s7MBbqfU%2BbEM%2FAzpoYE%3D",
    "​​entityTypeId": [ "0": "2" ],
    "​​​length": 1,
    "​​​numeratorId": "43",
    "​​users": [ "0": "UA" ],
    "sort": 500
}
​​
```

## 3\. Сгенерируем документ

Если шаблон успешно загружен, создадим документ для сделки с помощью метода [crm.documentgenerator.document.add](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-add.md). В методе укажем три параметра.

1. `templateId` — идентификатор шаблона. Передадим его из объекта `resTemplate`, который получен на втором шаге.

2. `entityTypeId` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Укажем `2` — сделка. Полный список типов объектов можно получить с помощью метода [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md).

3. `entityId` — идентификатор сделки. Укажем переменную `iDealID`.

{% list tabs %}

-  JS

   ```js
   const resDoc = await $b24.actions.v2.call.make({
       method: 'crm.documentgenerator.document.add',
       params: {
           'templateId': resTemplate.getData().result.template.id,
           'entityTypeId': '2',
           'entityId': iDealID
       },
       requestId: 'document-add'
   });
   ```

-  PHP

   ```php
   $resDoc = $sb->getCRMScope()->documentgeneratorDocument()->add(
       templateId: $resTemplate->getId(),
       entityTypeId: 2, // 2 — сделка (crm.enum.ownertype)
       entityId: $iDealID,
   );
   ```

- Python

   ```python
   res_doc = client.crm.documentgenerator.document.add(
       template_id=int(res_template["template"]["id"]),
       entity_type_id=2,
       entity_id=deal_id,
       values={},
       stamps_enabled=False,
   ).response.result
   ```

{% endlist %}

Документ будет сформирован и метод [crm.documentgenerator.document.add](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-add.md) вернет его параметры.

```json
"document":{
    "products":{
        "currencyId":"RUB",
        "totalSum":1500,
        "totalRows":1
    },
    "downloadUrl":"https:\\/\\/some-domain.bitrix24.ru\\/bitrix\\/services\\/main\\/ajax.php?action=crm.documentgenerator.document.download\\u0026SITE_ID=s1\\u0026id=29",
    "publicUrl":null,
    "title":"Демонстрационная реализация товара 1",
    "number":"1",
    "id":29,
    "createTime":"2025-07-09T16:29:27+03:00",
    "createdBy":27,
    "updateTime":"2025-07-09T16:29:27+03:00",
    "templateId":"39",
    "emailDiskFile":4917,
    "entityId":"1",
    "entityTypeId":"2",
    "downloadUrlMachine":"https:\\/\\/some-domain.bitrix24.ru\\/rest\\/crm.documentgenerator.document.download.json?sessid=c4ad892d7583ead4fd38666a0af85cb7\\u0026token=crm%7CYWN0aW9uPWNybS5kb2N1bWVudGdlbmVyYXRvci5kb2N1bWVudC5kb3dubG9hZCZTSVRFX0lEPXMxJmlkPTI5Jl89YlQ2SU9XeGVnR2s3NnZ5M0hGVlRxTDVaRlJtdFgyNTE%3D%7CImNybS5kb2N1bWVudGdlbmVyYXRvci5kb2N1bWVudC5kb3dubG9hZHxjcm18WVdOMGFXOXVQV055YlM1a2IyTjFiV1Z1ZEdkbGJtVnlZWFJ2Y2k1a2IyTjFiV1Z1ZEM1a2IzZHViRzloWkNaVFNWUkZYMGxFUFhNeEptbGtQVEk1Smw4OVlsUTJTVTlYZUdWblIyczNOblo1TTBoR1ZsUnhURFZhUmxKdGRGZ3lOVEU9fGM0YWQ4OTJkNzU4M2VhZDRmZDM4NjY2YTBhZjg1Y2I3Ig%3D%3D.H575mM4Mf%2Fj4PVH2Ngzb1kmkQhdScsAL75ZJkbYkALk%3D"
}
```

## Пример кода

{% list tabs %}

-  JS

   ```javascript
   import { B24Hook } from '@bitrix24/b24jssdk'

   const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
   // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

   let filePath = 'template.docx'; // путь к локальному файлу шаблона
   let iDealID = 1; // идентификатор сделки
   let sDocName = 'Демонстрационная реализация товара';

   function fileToBase64(filePath) {
       return new Promise((resolve, reject) => {
           fetch(filePath)
               .then(response => response.blob())
               .then(blob => {
                   let reader = new FileReader();
                   reader.onloadend = () => resolve(reader.result.split(',')[1]);
                   reader.onerror = reject;
                   reader.readAsDataURL(blob);
               });
       });
   }

   async function createDocument() {
       try {
           let fileContent = await fileToBase64(filePath);

           const resNum = await $b24.actions.v2.call.make({
               method: 'crm.documentgenerator.numerator.add',
               params: { fields: { 'name': 'Нумератор из REST', 'template': '{NUMBER}' } },
               requestId: 'numerator-add'
           });

           if (resNum.getData().result.numerator.id) {
               const resTemplate = await $b24.actions.v2.call.make({
                   method: 'crm.documentgenerator.template.add',
                   params: {
                       fields: {
                           'name': sDocName,
                           'numeratorId': resNum.getData().result.numerator.id,
                           'region': 'ru',
                           'users': ['UA'],
                           'entityTypeId': ['2'],
                           'file': fileContent
                       }
                   },
                   requestId: 'template-add'
               });

               if (resTemplate.getData().result.template.id) {
                   await $b24.actions.v2.call.make({
                       method: 'crm.documentgenerator.document.add',
                       params: {
                           'templateId': resTemplate.getData().result.template.id,
                           'entityTypeId': '2',
                           'entityId': iDealID
                       },
                       requestId: 'document-add'
                   });
                   alert('Документ создан');
               }
           }
       } catch (error) {
           console.error(error);
           alert('Ошибка: ' + error.message);
       }
   }

   createDocument();
   ```

-  PHP

   ```php
   <?php
   // composer require bitrix24/b24phpsdk:"^3.0"
   require_once 'vendor/autoload.php';

   use Bitrix24\SDK\Services\ServiceBuilderFactory;
   use Symfony\Component\EventDispatcher\EventDispatcher;
   use Psr\Log\NullLogger;

   $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
       ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

   $filePath = __DIR__ . '/template.docx'; // путь к локальному файлу шаблона
   $iDealID = 1; // идентификатор сделки
   $sDocName = 'Демонстрационная реализация товара';
   try {
       $resNum = $sb->getCRMScope()->documentgeneratorNumerator()->add(
           [
               'name' => 'Нумератор из REST',
               'template' => '{NUMBER}',
           ]
       );
       $resDoc = null;
       if (!empty($resNum->getId()))
       {
           $resTemplate = $sb->getCRMScope()->documentgeneratorTemplate()->add(
               [
                   'name' => $sDocName,
                   'numeratorId' => $resNum->getId(), // crm.documentgenerator.numerator.add
                   'region' => 'ru', // eu,de,ua,by,ru
                   'users' => [
                       'UA'//User All
                   ],
                   'entityTypeId' => ['2'], // 2 — сделка (crm.enum.ownertype)
                   'file' => base64_encode(file_get_contents($filePath))
               ]
           );
           if (!empty($resTemplate->getId()))
           {
               $resDoc = $sb->getCRMScope()->documentgeneratorDocument()->add(
                   templateId: $resTemplate->getId(),
                   entityTypeId: 2, // 2 — сделка (crm.enum.ownertype)
                   entityId: $iDealID,
               );
           }
       }
       if (!empty($resDoc) && !empty($resDoc->getId()))
       {
           echo json_encode(['message' => 'Документ создан']);
       }
       else
       {
           echo json_encode(['message' => 'Документ не создан']);
       }
   } catch (\Throwable $e) {
       echo json_encode(['message' => 'Документ не создан: ' . $e->getMessage()]);
   }
   ```

- Python

    ```python
    import base64

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    template_path = "template.docx"
    deal_id = 1
    document_name = "Демонстрационная реализация товара"

    try:
        numerator = client.crm.documentgenerator.numerator.add(
            fields={
                "name": "Нумератор из REST",
                "template": "{NUMBER}",
            }
        ).response.result["numerator"]
    except BitrixAPIError as error:
        print(f"Number generator not added: {error}")
    else:
        with open(template_path, "rb") as file:
            template_content = base64.b64encode(file.read()).decode("ascii")

        try:
            template = client.crm.documentgenerator.template.add(
                fields={
                    "name": document_name,
                    "numeratorId": numerator["id"],
                    "region": "ru",
                    "users": ["UA"],
                    "entityTypeId": ["2"],
                    "file": template_content,
                }
            ).response.result["template"]
        except BitrixAPIError as error:
            print(f"Template not added: {error}")
        else:
            try:
                document = client.crm.documentgenerator.document.add(
                    template_id=int(template["id"]),
                    entity_type_id=2,
                    entity_id=deal_id,
                    values={},
                    stamps_enabled=False,
                ).response.result["document"]
            except BitrixAPIError as error:
                print(f"Document not created: {error}")
            else:
                if document:
                    print("Документ создан")
                else:
                    print("Документ не создан")
    ```

{% endlist %}
