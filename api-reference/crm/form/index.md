# CRM-формы: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

CRM-форма собирает данные клиента на сайте, в виджете или по ссылке и создает по ним объекты CRM: лид, сделку, контакт, компанию, предложение или элемент смарт-процесса.

Методы `crm.form.*` относятся к [REST 3.0](../../rest-v3.md) и покрывают полный цикл работы с формой:

- поиск форм по точному названию и фильтрам: активность, целевой объект CRM, ответственный, дата создания
- получение полной конфигурации формы
- получение доступных на Битрикс24 сценариев, целевых объектов, воронок и полей выбранных объектов
- создание формы с настройками конструктора и проверка конфигурации до сохранения
- частичное изменение без перезаписи остальных настроек
- включение и выключение с учетом лимита активных форм
- удаление с учетом состояния формы и прав пользователя
- получение кода для размещения на сайте и публичной ссылки, настройка кнопки, положения и задержки автопоказа
- просмотр виджетов сайта и открытых линий, к которым подключена форма

Структура всех объектов раздела и правила записи полей описаны в статье [Типы данных и структура объектов в REST API CRM-форм](./data-types.md).

{% note warning "" %}

Методы недоступны на бесплатном и демо-тарифах.

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [CRM-формы: начало работы](https://helpdesk.bitrix24.ru/open/28809760/)

{% note info "" %}

Методы вызываются по адресу с `/rest/api/`. SDK PHP, BX24.js и PHP CRest такой адрес пока не поддерживают — используйте прямые HTTP-запросы или JS SDK `@bitrix24/b24jssdk`

{% endnote %}

## Как начать работу

1. Получите справочники конструктора методом [crm.form.configuration.get](./setup/crm-form-configuration-get.md): схемы CRM `entitySchemes`, воронки, типы полей, языки, платежные системы, права пользователя и лимит активных форм
2. Выберите сценарий формы методом [crm.form.scenario.list](./setup/crm-form-scenario-list.md), если хотите создать форму по готовому шаблону
3. Получите коды полей объектов выбранной схемы методом [crm.form.entityfield.list](./setup/crm-form-entityfield-list.md). Имена объектов возьмите из `entitySchemes[].entityNames`
4. Проверьте конфигурацию методом [crm.form.validate](./crm-form-validate.md). Метод вернет все нарушения сразу и ничего не сохранит
5. Создайте форму методом [crm.form.add](./crm-form-add.md). Созданная форма по умолчанию активна, чтобы создать выключенную, передайте `active: false`
6. Включите форму методом [crm.form.activate](./crm-form-activate.md), если создавали ее выключенной
7. Получите код для сайта или публичную ссылку методом [crm.form.embedding.get](./placement/crm-form-embedding-get.md)

{% note tip "Пользовательская документация" %}

- [Как создать и настроить CRM-форму](https://helpdesk.bitrix24.ru/open/24730032/)
- [Как выбрать сценарий работы CRM-формы](https://helpdesk.bitrix24.ru/open/24821442/)
- [Как работать со списком CRM-форм](https://helpdesk.bitrix24.ru/open/25221720/)
- [Как изменить дизайн CRM-форм](https://helpdesk.bitrix24.ru/open/25145412/)

{% endnote %}

## Особенности работы методов

**Частичное изменение.** [crm.form.update](./crm-form-update.md) меняет только переданные поля. Коллекции, например поля формы `fields` или очередь ответственных `responsible.userIds`, заменяются целиком. Формат записи совпадает с форматом чтения — описание в разделе [Структура CRM-формы](./data-types.md#crm_form).

**Версия формы.** Поле `updatedTime` — версия формы. [crm.form.update](./crm-form-update.md) и [crm.form.embedding.update](./placement/crm-form-embedding-update.md) требуют передать версию, прочитанную методом [crm.form.get](./crm-form-get.md). [crm.form.delete](./crm-form-delete.md), [crm.form.activate](./crm-form-activate.md) и [crm.form.deactivate](./crm-form-deactivate.md) принимают ее по желанию. Если форму успели изменить, метод вернет ошибку `CRM_FORM_VERSION_MISMATCH` с текущей версией в `currentUpdatedTime`. Версию меняет и [crm.form.embedding.update](./placement/crm-form-embedding-update.md): после изменения настроек размещения получите форму заново.

**Выборка полей.** [crm.form.get](./crm-form-get.md) и [crm.form.list](./crm-form-list.md) без `select` возвращают только простые поля формы. Разделы, например `crm`, `fields` или `appearance`, нужно запросить в `select`.

**Активность и удаление.** Активность меняют только [crm.form.activate](./crm-form-activate.md) и [crm.form.deactivate](./crm-form-deactivate.md). Активную форму можно удалить только с подтверждением `confirmed: true`. Системные формы, у которых `system: true`, нельзя изменить, выключить или удалить.

Форма включается, только если ее конфигурация проходит проверку [crm.form.validate](./crm-form-validate.md) и не исчерпан лимит активных форм. Выключить можно любую несистемную форму, даже если она не проходит проверку или лимит исчерпан. Повторное включение активной формы или выключение выключенной не меняет ее состояние. Выключенную форму можно удалить без подтверждения, повторное удаление вернет ошибку «не найдена».

**Одна форма за вызов.** Методы изменения работают с одной формой по `id` и не принимают `filter`.

## Права и ограничения

**Права пользователя.** Методы работают с собственной моделью прав CRM-форм. Для чтения нужно право на просмотр форм, для создания, изменения, включения и удаления — право на изменение. Права текущего пользователя возвращает [crm.form.configuration.get](./setup/crm-form-configuration-get.md) в ключе `permissions`.

**Тариф.** Учитываются ограничения тарифа:

- лимит активных форм. Текущее число и максимум — в ключе `limits.activeForms` ответа [crm.form.configuration.get](./setup/crm-form-configuration-get.md). При превышении методы вернут ошибку `CRM_FORM_ACTIVATION_LIMIT_REACHED`
- удаление надписи «Заряжено Битрикс24». Если тариф не позволяет, значение `appearance.copyrightRemoved: true` сохраняется как `false`
- доступ к редактированию форм. Если тариф не позволяет изменять формы, методы записи вернут ошибку `CRM_FORM_WRITE_RESTRICTED`

**Поля формы.** Набор доступных полей зависит от схемы CRM `crm.entityScheme`: в форму можно добавить только поля объектов выбранной схемы.

**Способ авторизации.** Методы работают одинаково через OAuth, входящий вебхук со scope `crm` и при работе агента через [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md).

{% note tip "Пользовательская документация" %}

- [Как настроить права доступа к CRM-формам](https://helpdesk.bitrix24.ru/open/23440556/)

{% endnote %}

## Связь с другими объектами

CRM-форма связана с объектами CRM, пользователями, сайтами и открытыми линиями.

**Объекты CRM.** Заполнение формы создает объекты по схеме `crm.entityScheme`. Идентификаторы схем, воронок сделок `dealCategoryId` и воронок смарт-процессов `smartProcessCategoryId` возвращает [crm.form.configuration.get](./setup/crm-form-configuration-get.md). Коды полей объектов для массива `fields` возвращает [crm.form.entityfield.list](./setup/crm-form-entityfield-list.md).

**Пользователи.** Ответственные за заполнения указываются в `responsible.userIds`. Идентификаторы пользователей можно получить методом [user.get](../../user/user-get.md).

**Сайты и виджеты.** Код для вставки на сайт и публичную ссылку возвращает [crm.form.embedding.get](./placement/crm-form-embedding-get.md). Виджеты сайта, к которым подключена форма, возвращает [crm.form.sitebutton.list](./placement/crm-form-sitebutton-list.md).

**Открытые линии.** Открытые линии и признак того, что форма в них приветственная, возвращает [crm.form.openline.list](./placement/crm-form-openline-list.md). Привязать форму к виджету или открытой линии через REST нельзя: методы только читают данные.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Формы

#|
|| **Метод** | **Описание** ||
|| [crm.form.add](./crm-form-add.md) | Создает CRM-форму ||
|| [crm.form.update](./crm-form-update.md) | Частично изменяет CRM-форму ||
|| [crm.form.get](./crm-form-get.md) | Возвращает CRM-форму по идентификатору ||
|| [crm.form.list](./crm-form-list.md) | Возвращает список CRM-форм с фильтрацией и сортировкой ||
|| [crm.form.delete](./crm-form-delete.md) | Удаляет CRM-форму ||
|| [crm.form.validate](./crm-form-validate.md) | Проверяет конфигурацию формы без сохранения ||
|| [crm.form.activate](./crm-form-activate.md) | Включает CRM-форму ||
|| [crm.form.deactivate](./crm-form-deactivate.md) | Выключает CRM-форму ||
|| [crm.form.field.list](./crm-form-field-list.md) | Возвращает список полей CRM-формы ||
|| [crm.form.field.get](./crm-form-field-get.md) | Возвращает описание поля CRM-формы по имени ||
|#

### Справочники для настройки формы

Методы возвращают данные, которые нужны для создания и изменения формы. Подробнее — в обзоре [Справочники для настройки CRM-формы](./setup/index.md).

#|
|| **Метод** | **Описание** ||
|| [crm.form.configuration.get](./setup/crm-form-configuration-get.md) | Возвращает справочники конструктора форм: схемы CRM, воронки, типы полей, языки, права и лимиты ||
|| [crm.form.configuration.field.list](./setup/crm-form-configuration-field-list.md) | Возвращает список полей конфигурации конструктора ||
|| [crm.form.configuration.field.get](./setup/crm-form-configuration-field-get.md) | Возвращает описание поля конфигурации конструктора по имени ||
|| [crm.form.scenario.list](./setup/crm-form-scenario-list.md) | Возвращает сценарии создания форм ||
|| [crm.form.scenario.field.list](./setup/crm-form-scenario-field-list.md) | Возвращает список полей сценария ||
|| [crm.form.scenario.field.get](./setup/crm-form-scenario-field-get.md) | Возвращает описание поля сценария по имени ||
|| [crm.form.scenariocategory.list](./setup/crm-form-scenariocategory-list.md) | Возвращает категории сценариев ||
|| [crm.form.scenariocategory.field.list](./setup/crm-form-scenariocategory-field-list.md) | Возвращает список полей категории сценариев ||
|| [crm.form.scenariocategory.field.get](./setup/crm-form-scenariocategory-field-get.md) | Возвращает описание поля категории сценариев по имени ||
|| [crm.form.entityfield.list](./setup/crm-form-entityfield-list.md) | Возвращает поля объектов CRM, которые можно добавить в форму ||
|| [crm.form.entityfield.field.list](./setup/crm-form-entityfield-field-list.md) | Возвращает список полей описания поля объекта CRM ||
|| [crm.form.entityfield.field.get](./setup/crm-form-entityfield-field-get.md) | Возвращает описание поля из ответа crm.form.entityfield.list по имени ||
|#

### Размещение и каналы

Методы возвращают код для сайта, настраивают кнопку и автопоказ, показывают виджеты и открытые линии формы. Подробнее — в обзоре [Размещение CRM-формы и каналы](./placement/index.md).

#|
|| **Метод** | **Описание** ||
|| [crm.form.embedding.update](./placement/crm-form-embedding-update.md) | Сохраняет настройки показа формы по клику и автопоказа ||
|| [crm.form.embedding.get](./placement/crm-form-embedding-get.md) | Возвращает код и ссылку для размещения формы, текущие настройки показа и их допустимые значения ||
|| [crm.form.embedding.field.list](./placement/crm-form-embedding-field-list.md) | Возвращает список полей вариантов размещения ||
|| [crm.form.embedding.field.get](./placement/crm-form-embedding-field-get.md) | Возвращает описание поля вариантов размещения по имени ||
|| [crm.form.sitebutton.list](./placement/crm-form-sitebutton-list.md) | Возвращает виджеты на сайт и показывает, подключена ли к ним форма ||
|| [crm.form.sitebutton.field.list](./placement/crm-form-sitebutton-field-list.md) | Возвращает список полей виджета сайта ||
|| [crm.form.sitebutton.field.get](./placement/crm-form-sitebutton-field-get.md) | Возвращает описание поля виджета сайта по имени ||
|| [crm.form.openline.list](./placement/crm-form-openline-list.md) | Возвращает открытые линии и показывает, является ли форма в них приветственной ||
|| [crm.form.openline.field.list](./placement/crm-form-openline-field-list.md) | Возвращает список полей открытой линии ||
|| [crm.form.openline.field.get](./placement/crm-form-openline-field-get.md) | Возвращает описание поля открытой линии по имени ||
|#
