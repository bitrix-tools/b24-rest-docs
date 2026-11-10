# КЭДО: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Битрикс24 КЭДО позволяет подписывать кадровые документы с сотрудниками с помощью электронной подписи ПЭП. Подпись равна собственноручной и соответствует требованиям закона.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация:
> - [Битрикс24 КЭДО](https://helpdesk.bitrix24.ru/open/19740668/)
> - [Как настроить права доступа в Битрикс24 КЭДО](https://helpdesk.bitrix24.ru/open/20881134/)

Методы `sign.b2e.*` работают с документами раздела КЭДО — Подписание с сотрудниками. С их помощью можно отправить документ на подписание, получить данные документа, список провайдеров подписи компании и списки подписанных документов.

Методы `sign.b2e.provider.*` подключают к Битрикс24 собственные провайдеры подписи. Их вызывает администратор. Методы работают, только если КЭДО доступен на Битрикс24.

Методы `humanresources.hcmlink.*` управляют данными интеграции КЭДО с системами кадрового учета через HCM Link: компаниями, сотрудниками, сопоставлениями и значениями полей.

Методы выполняются только в контексте авторизации [приложения](../../settings/app-installation/index.md). Вызовы через вебхук методы отклоняют с ошибкой `WRONG_AUTH_TYPE`.

## Как выбрать группу методов

#|
|| **Если нужно** | **Используйте** ||
|| Отправлять документы на подписание и получать информацию о подписании | Методы `sign.b2e.*` ||
|| Подключить к Битрикс24 собственный провайдер подписи | Методы [sign.b2e.provider.*](#providers) ||
|| Отслеживать изменение статусов документа и участников подписания | События `OnSignB2e*` ||
|| Передавать данные из системы кадрового учета для заполнения документов КЭДО | Методы [humanresources.hcmlink.*](./hcm-link/index.md) ||
|#

## Связь с другими объектами

**Компания CRM.** Документ КЭДО отправляется от имени компании. В методах `sign.b2e.document.send` и `sign.b2e.company.provider.list` компанию можно указать через `company.crmId` или `companyCrmId`. Это идентификатор компании CRM, подключенной как «моя компания». Получить его можно методом [crm.item.list](../crm/universal/crm-item-list.md) с параметром `entityTypeId = 4` и фильтром `isMyCompany = Y`.

**Провайдер подписи.** Методы работают с провайдерами на двух уровнях. Метод [sign.b2e.company.provider.list](./sign-b2e-company-provider-list.md) показывает провайдеров, подключенных к конкретной компании. Из его ответа берут `uid`, чтобы передать провайдера в параметре `companyProviderUid` метода [sign.b2e.document.send](./sign-b2e-document-send.md). Методы [sign.b2e.provider.*](#providers) управляют списком внешних провайдеров Битрикс24: регистрируют сервис провайдера, его страницы и публичный ключ. У внешнего провайдера числовой `id`. Для отправки документа он не подходит: в `companyProviderUid` передают `uid` из ответа `sign.b2e.company.provider.list`.

**Сотрудник и пользователь.** Участники подписания и ответственный связаны с пользователями Битрикс24 через `userId`. Если компания подключена к HCM Link, вместо `userId` можно передать `employeeId` или `employeeCode` сотрудника из системы кадрового учета.

**HCM Link.** Интеграция с системами кадрового учета передает компании, сотрудников и значения полей для документов КЭДО. Если документ отправляется по данным HCM Link, методы `sign.b2e.*` связываются с методами [humanresources.hcmlink.*](./hcm-link/index.md).

**Файл документа.** Метод `sign.b2e.document.send` принимает PDF-файл в параметре `files[].fileContent`, закодированный в Base64. После подписания файл можно получить из списков подписанных документов пользователя или сейфа компании. Если документ связан с HCM Link, данные подписанного файла можно получить методом [sign.b2e.hcmlink.document.get](./sign-b2e-hcmlink-document-get.md) по идентификатору участника подписания.

**Статусы подписания.** События `OnSignB2eDocumentStatusChanged` и `OnSignB2eMemberStatusChanged` сообщают об изменениях статусов документа и участников. Событие `OnSignHcmLinkB2eDocumentSigned` сообщает о подписании документа, связанного с HCM Link. Детали документа можно получить методом [sign.b2e.document.get](./sign-b2e-document-get.md) по `uid`.

## Как начать работу

1. Получите провайдеров подписи компании методом [sign.b2e.company.provider.list](./sign-b2e-company-provider-list.md) и возьмите `uid` нужного провайдера
2. Отправьте документ на подписание методом [sign.b2e.document.send](./sign-b2e-document-send.md). Сохраните `uid` документа из ответа
3. Подпишитесь на событие [OnSignB2eDocumentStatusChanged](./events/on-sign-b2e-document-status-changed.md), чтобы узнать, когда изменится статус документа
4. Получите статусы документа и участников методом [sign.b2e.document.get](./sign-b2e-document-get.md) по `uid`. Ссылки на подписанные файлы возвращают методы [sign.b2e.personal.tail](./sign-b2e-personal-tail.md) и [sign.b2e.mysafe.tail](./sign-b2e-mysafe-tail.md) в поле `file_url`

## Ограничения

- Методы работают, только если КЭДО доступен на Битрикс24
- Метод `sign.b2e.document.send` принимает один PDF-файл в кодировке Base64. Отправить несколько файлов в одном документе нельзя
- Права на методы зависят от прав пользователя в КЭДО: отправлять документы может пользователь с правом создавать документы КЭДО, сейф компании доступен пользователю с доступом к разделу «Сейф компании»

## Особенности scope

**sign.b2e** — используется в методах работы с документами КЭДО, методах внешних провайдеров подписи и событиях подписания.

**crm** — используется в методах:
- [sign.b2e.document.send](./sign-b2e-document-send.md)
- [sign.b2e.document.get](./sign-b2e-document-get.md)
- [sign.b2e.company.provider.list](./sign-b2e-company-provider-list.md)

**humanresources.hcmlink** — используется:

- в методах [sign.b2e.document.send](./sign-b2e-document-send.md) и [sign.b2e.company.provider.list](./sign-b2e-company-provider-list.md), если приложение передает данные HCM Link: `company.uuid`, `members.employeeCode`, `members.employeeId`, `responsible.employeeCode`, `responsible.employeeId`, `companyUuid`
- в методах интеграции КЭДО с системами кадрового учета. Подробный сценарий описан в разделе [Интеграция КЭДО с системами кадрового учета](./hcm-link/index.md)

## Обзор методов и событий {#all-methods}

### Документы КЭДО

> Scope: [`sign.b2e`](../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [sign.b2e.document.send](./sign-b2e-document-send.md) | Отправляет документ на подписание ||
    || [sign.b2e.document.get](./sign-b2e-document-get.md) | Получает информацию о документе и участниках подписания ||
    || [sign.b2e.hcmlink.document.get](./sign-b2e-hcmlink-document-get.md) | Получает данные подписанного документа, связанного с HCM Link ||
    || [sign.b2e.company.provider.list](./sign-b2e-company-provider-list.md) | Возвращает список провайдеров подписи компании ||
    || [sign.b2e.personal.tail](./sign-b2e-personal-tail.md) | Возвращает список подписанных документов пользователя ||
    || [sign.b2e.mysafe.tail](./sign-b2e-mysafe-tail.md) | Возвращает список подписанных документов в сейфе компании ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnSignB2eDocumentStatusChanged](./events/on-sign-b2e-document-status-changed.md) | При изменении статуса документа ||
    || [OnSignB2eMemberStatusChanged](./events/on-sign-b2e-member-status-changed.md) | При изменении статуса участника подписания ||
    || [OnSignHcmLinkB2eDocumentSigned](./events/on-sign-hcm-link-b2e-document-signed.md) | При подписании документа, связанного с HCM Link ||
    |#

{% endlist %}

### Внешние провайдеры подписи {#providers}

> Scope: [`sign.b2e`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

#|
|| **Метод** | **Описание** ||
|| [sign.b2e.provider.add](./sign-b2e-provider-add.md) | Подключает внешний провайдер подписи ||
|| [sign.b2e.provider.update](./sign-b2e-provider-update.md) | Изменяет данные внешнего провайдера подписи ||
|| [sign.b2e.provider.tail](./sign-b2e-provider-tail.md) | Возвращает список внешних провайдеров подписи ||
|| [sign.b2e.provider.delete](./sign-b2e-provider-delete.md) | Отключает внешний провайдер подписи ||
|#

### Интеграция с системами кадрового учета

> Scope: [`humanresources.hcmlink`](../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [humanresources.hcmlink.company.add](./hcm-link/humanresources-hcmlink-company-add.md) | Добавляет компанию из системы кадрового учета ||
|| [humanresources.hcmlink.company.update](./hcm-link/humanresources-hcmlink-company-update.md) | Обновляет компанию из системы кадрового учета и список ее полей ||
|| [humanresources.hcmlink.company.list](./hcm-link/humanresources-hcmlink-company-list.md) | Возвращает список компаний из системы кадрового учета ||
|| [humanresources.hcmlink.company.user.list](./hcm-link/humanresources-hcmlink-company-user-list.md) | Возвращает компании из системы кадрового учета, связанные с текущим пользователем ||
|| [humanresources.hcmlink.company.delete](./hcm-link/humanresources-hcmlink-company-delete.md) | Удаляет компанию из интеграции HCM Link ||
|| [humanresources.hcmlink.employee.set](./hcm-link/humanresources-hcmlink-employee-set.md) | Передает список сотрудников из системы кадрового учета ||
|| [humanresources.hcmlink.employee.list](./hcm-link/humanresources-hcmlink-employee-list.md) | Возвращает список сопоставленных сотрудников системы кадрового учета и Битрикс24 ||
|| [humanresources.hcmlink.field.value.set](./hcm-link/humanresources-hcmlink-field-value-set.md) | Передает значения полей системы кадрового учета для сотрудников ||
|| [humanresources.hcmlink.job.update](./hcm-link/humanresources-hcmlink-job-update.md) | Обновляет задание синхронизации ||
|| [humanresources.hcmlink.job.status.get](./hcm-link/humanresources-hcmlink-job-status-get.md) | Проверяет, активно ли задание синхронизации ||
|#
