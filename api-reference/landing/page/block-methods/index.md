# Работа с блоками страницы: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Группа методов управляет блоками страницы в режиме редактирования. С ее помощью можно добавлять новые блоки, менять их порядок, скрывать, удалять, восстанавливать и сохранять в «Мои блоки».

{% note warning "" %}

Методы изменяют блоки в черновике страницы. Если страница уже опубликована, у блока в опубликованной версии и в версии для редактирования могут быть разные идентификаторы. Для изменения передавайте идентификатор блока из версии для редактирования. Получите его методом [landing.block.getList](../../block/methods/landing-block-get-list.md) с параметром `params.edit_mode = 1`. После изменений опубликуйте страницу методом [landing.landing.publication](../methods/landing-landing-publication.md).

{% endnote %}

> Быстрый переход: [все методы](#all-methods)

## Как работать с блоками

1. Получите идентификатор страницы методом [landing.landing.getList](../methods/landing-landing-get-list.md) или используйте `lid`, который вернули методы [landing.landing.add](../methods/landing-landing-add.md), [landing.landing.addByTemplate](../methods/landing-landing-add-by-template.md) и [landing.landing.copy](../methods/landing-landing-copy.md)
2. Если нужно работать с уже существующим блоком, получите список блоков методом [landing.block.getList](../../block/methods/landing-block-get-list.md) с параметром `params.edit_mode = 1`
3. Выберите нужное действие в зависимости от сценария

   - [landing.landing.addblock](./landing-landing-add-block.md) — добавить новый блок из репозитория. Доступные коды блоков возвращает [landing.block.getrepository](../../block/methods/landing-block-get-repository.md)
   - [landing.landing.copyblock](./landing-landing-copy-block.md) — скопировать блок
   - [landing.landing.moveblock](./landing-landing-move-block.md), [landing.landing.upblock](./landing-landing-up-block.md), [landing.landing.downblock](./landing-landing-down-block.md) — изменить положение блока
   - [landing.landing.hideblock](./landing-landing-hide-block.md) и [landing.landing.showblock](./landing-landing-show-block.md) — управлять видимостью блока
   - [landing.landing.markdeletedblock](./landing-landing-mark-deleted-block.md), [landing.landing.markundeletedblock](./landing-landing-mark-undeleted-block.md), [landing.landing.deleteblock](./landing-landing-delete-block.md) — удалить блок временно или полностью
   - [landing.landing.favoriteBlock](./landing-landing-favorite-block.md) и [landing.landing.unFavoriteBlock](./landing-landing-unfavorite-block.md) — работать с сохраненными блоками
4. После изменений опубликуйте страницу методом [landing.landing.publication](../methods/landing-landing-publication.md)

## Что нужно учитывать

Параметр `scope` задает внутренний тип сайта или страницы. Он не связан со скоупом доступа `landing`. Для страниц в скоупах `knowledge`, `group` и `mainpage` передавайте корректный `scope`, иначе метод может не найти страницу или блок.

## Связь с другими объектами

**Список блоков страницы.** Метод [landing.block.getList](../../block/methods/landing-block-get-list.md) возвращает состав страницы и текущее состояние ее блоков.

**Репозиторий блоков.** В репозитории хранятся коды стандартных блоков и блоков, зарегистрированных приложением. Для блока приложения используйте код вида `repo_<ID>`.

**Файл превью.** Для [landing.landing.favoriteBlock](./landing-landing-favorite-block.md) идентификатор файла превью возвращает [landing.block.uploadfile](../../block/methods/landing-block-upload-file.md).

## Обзор методов {#all-methods}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом редактировать страницу

### Добавление и копирование

#|
|| **Метод** | **Описание** ||
|| [landing.landing.addblock](./landing-landing-add-block.md) | Добавляет новый блок на страницу ||
|| [landing.landing.copyblock](./landing-landing-copy-block.md) | Копирует блок на страницу ||
|| [landing.landing.favoriteBlock](./landing-landing-favorite-block.md) | Сохраняет блок в «Мои блоки» ||
|| [landing.landing.unFavoriteBlock](./landing-landing-unfavorite-block.md) | Удаляет блок из «Моих блоков» ||
|#

### Положение и видимость

#|
|| **Метод** | **Описание** ||
|| [landing.landing.moveblock](./landing-landing-move-block.md) | Перемещает блок на страницу ||
|| [landing.landing.upblock](./landing-landing-up-block.md) | Поднимает блок на одну позицию вверх ||
|| [landing.landing.downblock](./landing-landing-down-block.md) | Опускает блок на одну позицию вниз ||
|| [landing.landing.hideblock](./landing-landing-hide-block.md) | Скрывает блок на странице ||
|| [landing.landing.showblock](./landing-landing-show-block.md) | Показывает блок на странице ||
|#

### Удаление и восстановление

#|
|| **Метод** | **Описание** ||
|| [landing.landing.deleteblock](./landing-landing-delete-block.md) | Удаляет блок со страницы ||
|| [landing.landing.markdeletedblock](./landing-landing-mark-deleted-block.md) | Помечает блок как удаленный без физического удаления ||
|| [landing.landing.markundeletedblock](./landing-landing-mark-undeleted-block.md) | Восстанавливает блок из удаленных ||
|#
