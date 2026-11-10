# Места встраивания Базы знаний: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Базу знаний можно встроить в интерфейс Битрикс24 двумя способами: показать в меню или привязать к группе.

Другие места встраивания в разделе «Сайты» регистрируют методом [landing.repo.bind](../landing-repo-bind.md), они описаны в обзоре [Места встраивания в разделе Сайты](../index.md). Базу знаний привязывают отдельными методами, которые перечислены ниже, потому что в модуле `landing` она представлена отдельным сайтом.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как добавить базу знаний в группу](https://helpdesk.bitrix24.ru/open/10607334/)

## Как управлять встраиванием Базы знаний

**Привязка к меню.** Вариант подойдет, если База знаний должна быть доступна из одного и того же места в интерфейсе. Например, к списку сделок можно добавить Базу знаний со скриптами продаж. Так менеджер сможет открыть ее из раздела сделок, без перехода в другой раздел.

Чтобы настроить привязку:

1. Получите идентификатор сайта Базы знаний методом [landing.site.getList](../../site/landing-site-get-list.md#type-scope) с параметром `scope: "KNOWLEDGE"`.
2. Определите код меню `menuCode`, например `crm_switcher:deal`. Как его получить, описано в параметрах метода [landing.site.bindingToMenu](./landing-site-binding-to-menu.md).
3. Выполните привязку методом [landing.site.bindingToMenu](./landing-site-binding-to-menu.md).
4. Проверьте результат методом [landing.site.getMenuBindings](./landing-site-get-menu-bindings.md) с тем же `menuCode`: привязка должна появиться в списке.
5. Удалите привязку методом [landing.site.unbindingFromMenu](./landing-site-unbinding-from-menu.md), если она больше не нужна.

**Привязка к группе.** Этот вариант подойдет, если База знаний нужна только участникам конкретной группы. Например, Базу знаний отдела можно привязать к группе отдела, чтобы сотрудники читали инструкции и регламенты в рабочем пространстве группы. К одной группе можно привязать только одну Базу знаний.

Чтобы настроить привязку:

1. Получите идентификатор сайта Базы знаний методом [landing.site.getList](../../site/landing-site-get-list.md#type-scope) с параметром `scope: "KNOWLEDGE"`.
2. Получите идентификатор группы `groupId` методом [socialnetwork.api.workgroup.list](../../../sonet-group/socialnetwork-api-workgroup-list.md) или [sonet_group.get](../../../sonet-group/sonet-group-get.md). Его также видно в интерфейсе группы.
3. Выполните привязку методом [landing.site.bindingToGroup](./landing-site-binding-to-group.md).
4. Проверьте результат методом [landing.site.getGroupBindings](./landing-site-get-group-bindings.md) с тем же `groupId`: привязка должна появиться в списке.
5. Удалите привязку методом [landing.site.unbindingFromGroup](./landing-site-unbinding-from-group.md), если она больше не нужна.

Методы привязки и отвязки не возвращают ошибку, если действие не выполнено: они отвечают `false`. Причины перечислены на страницах методов.

## Связь с другими объектами

База знаний связана с сайтами модуля `landing`, меню и группами Битрикс24.

**Сайт.** База знаний — это сайт модуля `landing` с типом `KNOWLEDGE`. Как тип сайта влияет на параметр `scope` в методах сайтов, описано в статье [Работа с типами сайтов и скоупами](../../types.md).

**Группа.** При привязке к группе База знаний получает тип `GROUP`, и методы сайтов находят ее только с `scope: "GROUP"`. После отвязки тип снова меняется на `KNOWLEDGE`. Поэтому для [landing.site.unbindingFromGroup](./landing-site-unbinding-from-group.md) `id` берут из ответа [landing.site.getGroupBindings](./landing-site-get-group-bindings.md).

**Меню.** Место в интерфейсе задает параметр `menuCode`. Одну Базу знаний можно привязать к нескольким меню: для каждого вызовите [landing.site.bindingToMenu](./landing-site-binding-to-menu.md) со своим `menuCode`.

## Обзор методов {#all-methods}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

### Привязка к меню

#|
|| **Метод** | **Описание** ||
|| [landing.site.bindingToMenu](./landing-site-binding-to-menu.md) | Привязывает Базу знаний к меню ||
|| [landing.site.getMenuBindings](./landing-site-get-menu-bindings.md) | Получает привязки Базы знаний к меню ||
|| [landing.site.unbindingFromMenu](./landing-site-unbinding-from-menu.md) | Отвязывает Базу знаний от меню ||
|#

### Привязка к группе

#|
|| **Метод** | **Описание** ||
|| [landing.site.bindingToGroup](./landing-site-binding-to-group.md) | Привязывает Базу знаний к группе ||
|| [landing.site.getGroupBindings](./landing-site-get-group-bindings.md) | Получает привязки Базы знаний к группам ||
|| [landing.site.unbindingFromGroup](./landing-site-unbinding-from-group.md) | Отвязывает Базу знаний от группы ||
|#
