# Диск: обзор методов

Диск — это инструмент для работы с файлами. Он позволяет:

- хранить документы компании и личные файлы
- загружать, редактировать документы и просматривать историю изменений
- настраивать права доступа к файлам и папкам 
- делиться файлами через публичные ссылки с внешними пользователями
- синхронизировать файлы с компьютером

Диск интегрирован с Задачами, Чатами, CRM, Рабочими группами и другими инструментами Битрикс24. Это упрощает работу за счет быстрого доступа к файлам, совместной работы над ними и автоматизации документооборота.  

> Быстрый переход: [все методы](#all-methods) 
>
> Пользовательская документация: [Битрикс24 Диск](https://helpdesk.bitrix24.ru/open/20811344/)

## Хранилища Диска

Есть три вида хранилищ:

- личные хранилища пользователей
- общее хранилище компании
- хранилища рабочих групп

Хранилищами можно управлять с помощью группы методов [disk.storage.*](./storage/index.md).

{% note tip "Пользовательская документация" %}

- [Что хранится на Моем диске в Битрикс24](https://helpdesk.bitrix24.ru/open/18634620/)
- [Общий диск в Битрикс24](https://helpdesk.bitrix24.ru/open/19228208/)

{% endnote %}

## Работа с папками и файлами

Папки и файлы можно создавать, перемещать, удалять, а также изменять права доступа  к ним. Для этого используйте группы методов [disk.folder.*](./folder/index.md) и [disk.file.*](./file/index.md).

Узнать версию файла можно с помощью метода [disk.version.get](./version/disk-version-get.md).

{% note tip "Пользовательская документация" %}

- [Документы Онлайн: начало работы](https://helpdesk.bitrix24.ru/open/20338924/)
- [Права доступа к Моему диску в Битрикс24](https://helpdesk.bitrix24.ru/open/19492254/)
- [Сколько хранятся версии документа на Диске](https://helpdesk.bitrix24.ru/open/18869612/)

{% endnote %}

## Связь Диска с другими объектами {#diskconnection}

**CRM.** Файлы можно прикрепить к делам и коммерческим предложениям. За работу с делами отвечает группа методов [crm.activity.*](../crm/timeline/activities/index.md), за работу с предложениями — [crm.quote.*](../crm/quote/crm-quote-add.md).

**Бизнес-процессы.** Можно запустить для документов общего диска. Управление бизнес-процессами выполняется методами [bizproc.workflow.*](../bizproc/index.md).

**Задачи.** Файлы прикрепляются к описанию задачи и комментариям. Все участники задачи могут просматривать, редактировать и скачивать прикрепленные файлы. Работать с задачами и комментариями необходимо через методы групп [tasks.task.*](../tasks/index.md) и [task.commentitem.*](../tasks/comment-item/index.md). 

**Календарь.** Файлы добавляются к событию и становятся доступными всем участникам. Создать и изменить событие можно с помощью методов [calendar.event.*](../calendar/index.md).

**Лента новостей.** Файлы прикрепляются к сообщениям и комментариям. Метод [log.blogpost.add](../log/log-blogpost-add.md) создает новое сообщение, а метод [log.blogcomment.add](../log/blogcomment/log-blogcomment-add.md) — новый комментарий.

**Почта.** Вложения из писем сохраняются на Диске. С письмами можно работать только через интерфейс Битрикс24. Если письмо сохранено в CRM, то с вложениями можно взаимодействовать методами [crm.activity.*](../crm/timeline/activities/index.md) через поле `FILES`. 

**Рабочие группы и проекты.** Диск интегрирован [в рабочие группы и проекты](../sonet-group/sonet-group-create.md), для каждого из них есть отдельное хранилище.

**Универсальные списки.** Элементы списка связаны с Диском через [поле](../lists/fields/index.md) типа Файл (Диск). Создать и изменить элемент можно с помощью методов [lists.element.*](../lists/elements/index.md).

**Чаты.** Пользователи могут обмениваться документами, фото, видео и аудио. Файлы можно просматривать и скачивать, а документы — редактировать в чате без скачивания. Прикрепленные файлы доступны всем участникам чата. Метод [im.message.add](../chats/messages/im-message-add.md) отправляет сообщение с файлом в чат.

{% note tip "Пользовательская документация" %}

- [Бизнес-процессы на диске в Битрикс24](https://helpdesk.bitrix24.ru/open/20703790/)
- [Диск в группах и проектах](https://helpdesk.bitrix24.ru/open/16697770/)
- [Как загрузить файл из облачного хранилища в Битрикс24](https://helpdesk.bitrix24.ru/open/19545084/)
- [Как использовать публичные и внутренние ссылки на файлы в Битрикс24](https://helpdesk.bitrix24.ru/open/19096030/)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`disk`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

### Версия

#|
|| **Метод** | **Описание** ||
|| [disk.version.get](version/disk-version-get.md) | Возвращает версию по идентификатору ||
|#

### Папка

#|
|| **Метод** | **Описание** ||
|| [disk.folder.getfields](folder/disk-folder-get-fields.md) | Возвращает описание полей папки ||
|| [disk.folder.get](folder/disk-folder-get.md) | Возвращает папку по идентификатору ||
|| [disk.folder.getchildren](folder/disk-folder-get-children.md) | Возвращает список файлов и папок, которые находятся непосредственно в папке ||
|| [disk.folder.addsubfolder](folder/disk-folder-add-subfolder.md) | Создает дочернюю папку ||
|| [disk.folder.copyto](folder/disk-folder-copy-to.md) | Копирует папку в указанную папку ||
|| [disk.folder.moveto](folder/disk-folder-move-to.md) | Перемещает папку в указанную папку ||
|| [disk.folder.rename](folder/disk-folder-rename.md) | Переименовывает папку ||
|| [disk.folder.deletetree](folder/disk-folder-delete-tree.md) | Уничтожает папку и все ее дочерние элементы навсегда ||
|| [disk.folder.markdeleted](folder/disk-folder-mark-deleted.md) | Перемещает папку в корзину ||
|| [disk.folder.restore](folder/disk-folder-restore.md) | Восстанавливает папку из корзины ||
|| [disk.folder.uploadfile](folder/disk-folder-upload-file.md) | Загружает новый файл в указанную папку ||
|| [disk.folder.getExternalLink](folder/disk-folder-get-external-link.md) | Возвращает публичную ссылку ||
|#

### Права доступа

#|
|| **Метод** | **Описание** ||
|| [disk.rights.getTasks](rights/disk-rights-get-tasks.md) | Позволяет получить список уровней доступов, которые можно использовать в назначении прав ||
|#

### Прикрепленный файл

#|
|| **Метод** | **Описание** ||
|| [disk.attachedObject.get](attached-object/disk-attached-object-get.md) | Возвращает информацию о прикрепленном файле ||
|#

### Файл

#|
|| **Метод** | **Описание** ||
|| [disk.file.getfields](file/disk-file-get-fields.md) | Возвращает описание полей файла ||
|| [disk.file.get](file/disk-file-get.md) | Возвращает файл по идентификатору ||
|| [disk.file.rename](file/disk-file-rename.md) | Переименовывает файл ||
|| [disk.file.copyto](file/disk-file-copy-to.md) | Копирует файл в указанную папку ||
|| [disk.file.moveto](file/disk-file-move-to.md) | Перемещает файл в указанную папку ||
|| [disk.file.delete](file/disk-file-delete.md) | Уничтожает файл навсегда ||
|| [disk.file.markdeleted](file/disk-file-mark-deleted.md) | Перемещает файл в корзину ||
|| [disk.file.restore](file/disk-file-restore.md) | Восстанавливает файл из корзины ||
|| [disk.file.uploadversion](file/disk-file-upload-version.md) | Загружает новую версию файла ||
|| [disk.file.getVersions](file/disk-file-get-versions.md) | Возвращает список версий файла ||
|| [disk.file.restoreFromVersion](file/disk-file-restore-from-version.md) | Восстанавливает файл из конкретной версии ||
|| [disk.file.getExternalLink](file/disk-file-get-external-link.md) | Возвращает публичную ссылку на файл ||
|#

### Хранилище

#|
|| **Метод** | **Описание** ||
|| [disk.storage.getfields](storage/disk-storage-get-fields.md) | Возвращает описание полей хранилища ||
|| [disk.storage.get](storage/disk-storage-get.md) | Возвращает хранилище по идентификатору ||
|| [disk.storage.rename](storage/disk-storage-rename.md) | Переименовывает хранилище. Допустимо переименование только хранилища приложения (см. [disk.storage.getforapp](storage/disk-storage-get-for-app.md)) ||
|| [disk.storage.getlist](storage/disk-storage-get-list.md) | Возвращает список доступных хранилищ ||
|| [disk.storage.gettypes](storage/disk-storage-get-types.md) | Возвращает список типов хранилищ ||
|| [disk.storage.addfolder](storage/disk-storage-add-folder.md) | Создает папку в корне хранилища ||
|| [disk.storage.getchildren](storage/disk-storage-get-children.md) | Возвращает список файлов и папок, которые находятся непосредственно в корне хранилища ||
|| [disk.storage.uploadfile](storage/disk-storage-upload-file.md) | Загружает новый файл в корне хранилища ||
|| [disk.storage.getforapp](storage/disk-storage-get-for-app.md) | Возвращает описание хранилища, с которым может работать приложение для хранения своих данных (файлов и папок) ||
|#