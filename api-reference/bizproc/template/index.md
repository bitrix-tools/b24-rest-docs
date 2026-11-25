# Шаблоны бизнес-процессов: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Шаблоны бизнес-процессов задают логику автоматизации через действия и операции в дизайнере бизнес-процессов. Методы позволяют добавить шаблон из файла `.bpt`, обновить его параметры, получить список шаблонов и удалить шаблон, созданный приложением.

Методы работают только с шаблонами из дизайнера бизнес-процессов. Шаблоны роботов, настроенных на стадиях элементов CRM, смарт-процессов или в задачах, недоступны в REST API: их нельзя получить, изменить или удалить.

{% note info "" %}

Добавлять, обновлять и удалять шаблоны может администратор в контексте [приложения](../../../settings/app-installation/index.md). Обновить или удалить шаблон может только приложение, которое его создало.

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация:
> - [Как создать шаблон последовательного бизнес-процесса](https://helpdesk.bitrix24.ru/open/21918154/)
> - [Как настроить параметры шаблона](https://helpdesk.bitrix24.ru/open/22478438/)

## Как начать работу

1. Добавьте шаблон методом [bizproc.workflow.template.add](./bizproc-workflow-template-add.md)
2. Получите список шаблонов методом [bizproc.workflow.template.list](./bizproc-workflow-template-list.md)
3. Обновите шаблон методом [bizproc.workflow.template.update](./bizproc-workflow-template-update.md)
4. Удалите неактуальный шаблон методом [bizproc.workflow.template.delete](./bizproc-workflow-template-delete.md)

Методы `add` и `update` возвращают идентификатор шаблона, `list` — массив до 50 шаблонов на страницу с полями из `SELECT`, `delete` при успехе возвращает `null`.

## Как подготовить файл шаблона

Метод [bizproc.workflow.template.add](./bizproc-workflow-template-add.md) добавляет шаблон из файла с расширением `.bpt`. Чтобы получить файл, настройте шаблон бизнес-процесса в дизайнере и экспортируйте его.

![Экспорт шаблона](./_images/export-bp-template.png)

Полученный файл можно использовать как шаблон в нужном Битрикс24.

{% note tip "Пользовательская документация" %}

- [Дизайнер бизнес-процессов](https://helpdesk.bitrix24.ru/open/22955798/)
- [Экспорт и импорт шаблонов бизнес-процессов](https://helpdesk.bitrix24.ru/open/5435897/)

{% endnote %}

## Идентификатор типа документа

`DOCUMENT_TYPE` указывается в параметрах метода [bizproc.workflow.template.add](./bizproc-workflow-template-add.md), когда приложение добавляет шаблон из файла. В методе [bizproc.workflow.template.list](./bizproc-workflow-template-list.md) значения `MODULE_ID`, `ENTITY` и `DOCUMENT_TYPE` возвращаются в полях шаблона и могут использоваться для фильтрации.

`DOCUMENT_TYPE` — массив из трех строк. Он связывает шаблон с типом документа, для которого будет запускаться бизнес-процесс:

- идентификатор модуля, например `crm`
- идентификатор объекта, например `CCrmDocumentDeal`
- тип документа, например `DEAL`

### Возможные значения

#|
|| **Модуль** | **Идентификатор объекта** | **Тип документа** | **Описание** ||
|| `crm` | `CCrmDocumentLead` | `LEAD` | Лиды ||
|| `crm` | `CCrmDocumentContact` | `CONTACT` | Контакты ||
|| `crm` | `CCrmDocumentCompany` | `COMPANY` | Компании ||
|| `crm` | `CCrmDocumentDeal` | `DEAL` | Сделки ||
|| `crm` | `Bitrix\Crm\Integration\BizProc\Document\Quote` | `QUOTE` | Коммерческие предложения ||
|| `crm` | `Bitrix\Crm\Integration\BizProc\Document\SmartInvoice` | `SMART_INVOICE` | Счета ||
|| `crm` | `Bitrix\Crm\Integration\BizProc\Document\Dynamic` | `DYNAMIC_XXX` | Смарт-процессы, где XXX — идентификатор смарт-процесса ||
|| `lists` | `BizprocDocument` | `iblock_XXX` | Процессы в ленте новостей, где XXX — идентификатор информационного блока ||
|| `lists` | `Bitrix\Lists\BizprocDocumentLists` | `iblock_XXX` | Списки в группах, где XXX — идентификатор информационного блока ||
|| `disk` | `Bitrix\Disk\BizProcDocument` | `STORAGE_XXX` | Хранилище диска, где XXX — идентификатор хранилища ||
|#

## Что важно учитывать

- Список шаблонов доступен любому пользователю, но его состав зависит от прав: пользователь без прав администратора получает только пользовательские шаблоны нового конструктора бизнес-процессов без системного кода, которые ему доступны для редактирования
- Чтобы получить шаблоны приложения, передайте в фильтр метода [bizproc.workflow.template.list](./bizproc-workflow-template-list.md) поле `SYSTEM_CODE`, например `"SYSTEM_CODE": "rest_app_5"`. Такие шаблоны видит только администратор
- Шаблон, по которому есть запущенные бизнес-процессы, удалить нельзя: метод [bizproc.workflow.template.delete](./bizproc-workflow-template-delete.md) вернет ошибку. Сначала остановите такие процессы методом [bizproc.workflow.terminate](../bizproc-workflow-terminate.md) или удалите методом [bizproc.workflow.kill](../bizproc-workflow-kill.md)

## Связь с другими объектами

**Документ.** Шаблон связан с типом документа CRM, универсального списка или Диска через `DOCUMENT_TYPE` — значения приведены в таблице выше. Связь определяет контекст запуска: нельзя запустить процесс для лида, используя шаблон для сделки.

**Бизнес-процесс.** Идентификатор шаблона передается в `TEMPLATE_ID` метода [bizproc.workflow.start](../bizproc-workflow-start.md). По этому же полю можно отфильтровать запущенные процессы в методе [bizproc.workflow.instances](../bizproc-workflow-instances.md).

## Обзор методов {#all-methods}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - `add`, `update`, `delete` — администратор в контексте приложения
> - `list` — любой пользователь, состав списка зависит от прав

#|
|| **Метод** | **Описание** ||
|| [bizproc.workflow.template.add](./bizproc-workflow-template-add.md) | Добавляет шаблон бизнес-процесса из файла ||
|| [bizproc.workflow.template.update](./bizproc-workflow-template-update.md) | Обновляет шаблон ||
|| [bizproc.workflow.template.list](./bizproc-workflow-template-list.md) | Получает список шаблонов ||
|| [bizproc.workflow.template.delete](./bizproc-workflow-template-delete.md) | Удаляет шаблон ||
|#
