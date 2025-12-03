'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Heart, Pill } from 'lucide-react'

const entrySchema = z.object({
  date: z.string().min(1, 'Data é obrigatória'),
  weight: z.number().min(30).max(300, 'Peso inválido'),
  medication: z.string().min(1, 'Medicamento é obrigatório'),
  dosage: z.string().min(1, 'Dosagem é obrigatória'),
  wellbeing: z.string().min(1, 'Como está se sentindo é obrigatório'),
  notes: z.string().optional(),
})

type EntryFormData = z.infer<typeof entrySchema>

interface WeeklyEntryFormProps {
  onClose: () => void
  onSubmit: (data: EntryFormData) => void
  lastEntry?: {
    date: string
    weight: number
    medication: string
    dosage: string
    wellbeing: string
    notes?: string
  }
}

const medications = [
  { value: 'ozempic', label: 'Ozempic® (Semaglutida)' },
  { value: 'mounjaro', label: 'Mounjaro® (Tirzepatida)' },
  { value: 'saxenda', label: 'Saxenda® (Liraglutida)' },
  { value: 'wegovy', label: 'Wegovy® (Semaglutida)' },
]

const wellbeingOptions = [
  { value: 'excelente', label: 'Excelente - Me sinto muito bem' },
  { value: 'bom', label: 'Bom - Me sinto bem' },
  { value: 'regular', label: 'Regular - Alguns sintomas leves' },
  { value: 'ruim', label: 'Ruim - Sintomas moderados' },
  { value: 'muito_ruim', label: 'Muito Ruim - Sintomas severos' },
]

export function WeeklyEntryForm({ onClose, onSubmit, lastEntry }: WeeklyEntryFormProps) {
  const form = useForm<EntryFormData>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      weight: lastEntry?.weight || 0,
      medication: lastEntry?.medication || '',
      dosage: lastEntry?.dosage || '',
      wellbeing: lastEntry?.wellbeing || '',
      notes: lastEntry?.notes || '',
    },
  })

  const handleSubmit = (data: EntryFormData) => {
    onSubmit(data)
    form.reset()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Check-in Semanal
          </DialogTitle>
          <DialogDescription>
            Registre seu peso, medicamento e como está se sentindo esta semana
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data da Medição</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 85.5"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      Pese-se pela manhã, em jejum, sem roupas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="medication"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Pill className="h-4 w-4" />
                      Medicamento
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o medicamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {medications.map((med) => (
                          <SelectItem key={med.value} value={med.value}>
                            {med.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosagem</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 0.5mg, 2.5mg, 6 clicks"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Dose atual que está tomando
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wellbeing"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Como está se sentindo?
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione como está se sentindo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {wellbeingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Avalie como você está se sentindo com o tratamento
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Observações (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Efeitos colaterais, mudanças na rotina, dúvidas, etc..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Compartilhe qualquer observação relevante sobre seu tratamento
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Salvar Check-in
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
