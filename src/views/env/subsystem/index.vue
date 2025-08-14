<script setup lang="tsx">
import { NDivider } from 'naive-ui';
import { fetchBatchDeleteSubsystem, fetchGetSubsystemList } from '@/service/api/env/subsystem';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import DictTag from '@/components/custom/dict-tag.vue';
import ButtonIcon from '@/components/custom/button-icon.vue';
import SubsystemOperateDrawer from './modules/subsystem-operate-drawer.vue';
import SubsystemSearch from './modules/subsystem-search.vue';

defineOptions({
  name: 'SubsystemList'
});

const appStore = useAppStore();
const { download } = useDownload();
const { hasAuth } = useAuth();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetSubsystemList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    name: null,
    code: null,
    status: null,
    params: {}
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'name',
      title: '中文名称',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'code',
      title: '英文简称',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'status',
      title: '状态',
      align: 'center',
      minWidth: 120,
      render(row) {
        return <DictTag size="small" value={row.status} dictCode="sys_normal_disable" />;
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => {
        const divider = () => {
          if (!hasAuth('env:subsystem:edit') || !hasAuth('env:subsystem:remove')) {
            return null;
          }
          return <NDivider vertical />;
        };

        const editBtn = () => {
          if (!hasAuth('env:subsystem:edit')) {
            return null;
          }
          return (
            <ButtonIcon
              text
              type="primary"
              icon="material-symbols:drive-file-rename-outline-outline"
              tooltipContent={$t('common.edit')}
              onClick={() => edit(row.id!)}
            />
          );
        };

        const deleteBtn = () => {
          // if (!hasAuth('env:subsystem:remove')) {
          return null;
          // }
          // return (
          //   <ButtonIcon
          //     text
          //     type="error"
          //     icon="material-symbols:delete-outline"
          //     tooltipContent={$t('common.delete')}
          //     popconfirmContent={$t('common.confirmDelete')}
          //     onPositiveClick={() => handleDelete(row.id!)}
          //   />
          // );
        };

        return (
          <div class="flex-center gap-8px">
            {editBtn()}
            {divider()}
            {deleteBtn()}
          </div>
        );
      }
    }
  ]
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted } =
  useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  const { error } = await fetchBatchDeleteSubsystem(checkedRowKeys.value);
  if (error) return;
  onBatchDeleted();
}

// async function handleDelete(id: CommonType.IdType) {
// request
// const { error } = await fetchBatchDeleteSubsystem([id]);
//   if (error) return;
//   onDeleted();
// }

function edit(id: CommonType.IdType) {
  handleEdit('id', id);
}

function handleExport() {
  download('/env/subsystem/export', searchParams, `物理子系统_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <SubsystemSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="物理子系统列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('env:subsystem:add')"
          :show-delete="false"
          :show-export="hasAuth('env:subsystem:export')"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @export="handleExport"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <SubsystemOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
