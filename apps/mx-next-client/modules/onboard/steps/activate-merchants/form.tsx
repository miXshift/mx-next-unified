'use client';

import { DynamicTable } from '@/lib/components/dynamic-table';
import { columns } from './columns';
import { mockMerchants } from './mock-data';
import { Button } from '@ui/button';
import { useEffect, useState } from 'react';
import { Merchant } from './types';
import { useOnboarding } from '../../onboard.context';
import { Table } from '@tanstack/react-table';

interface ActivateMerchantsFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

export function ActivateMerchantsForm({
  onValidationChange,
}: ActivateMerchantsFormProps) {
  const { formData, updateStepData } = useOnboarding();

  // Initial validation - run once on mount
  useEffect(() => {
    const savedCount = formData['activate-merchants']?.selectedCount || 0;
    console.log('Initial validation:', { savedCount });
    const isValid = savedCount > 0;
    onValidationChange?.(isValid);
  }, []); // Empty dependency array

  return (
    <div className="space-y-6">
      <DynamicTable
        columns={columns}
        data={mockMerchants}
        enableTableConfig={false}
        onFilter={data => console.log('Filtered data:', data)}
        onStateChange={state => {
          const selectedCount = Object.keys(state.rowSelection || {}).length;
          const isValid = selectedCount > 0;
          console.log('Table state change:', {
            selectedCount,
            isValid,
            rowSelection: state.rowSelection,
          });

          updateStepData('activate-merchants', { selectedCount });
          onValidationChange?.(isValid);
        }}
      />
    </div>
  );
}
